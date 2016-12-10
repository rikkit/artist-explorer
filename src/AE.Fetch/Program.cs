using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using IF.Lastfm.Core;
using IF.Lastfm.Core.Api;
using IF.Lastfm.Core.Api.Enums;
using Newtonsoft.Json;

namespace AE.Fetch
{
    public class Artist
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("mbid")]
        public string Mbid { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("playCount")]
        public int? Playcount { get; set; }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                MainAsync(args).GetAwaiter().GetResult();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.ReadLine();
        }

        public static async Task MainAsync(string[] args)
        {
            var username = args.Skip(0).Take(1).SingleOrDefault();
            var apikey = args.Skip(1).Take(1).SingleOrDefault();
            var apisecret = args.Skip(2).Take(1).SingleOrDefault();
            var outFile = args.Skip(3).Take(1).SingleOrDefault();

            Console.WriteLine($"Using key {apikey} and secret {apisecret}");
            Console.WriteLine($"Username {username}");

            var lastfm = new LastfmClient(apikey, apisecret);

            var chartArtists =  await lastfm.Chart.GetTopArtistsAsync(1, 10);
            var userArtists = await lastfm.User.GetTopArtists(username, LastStatsTimeSpan.Year, 1, 10);

            var artistResponses = await Task.WhenAll(chartArtists
                .Concat(userArtists)
                .Select(artist => lastfm.Artist.GetInfoAsync(artist.Name)));

            var artists = artistResponses
                .Select(x => x.Content)
                .Where(x => !string.IsNullOrWhiteSpace(x.Mbid))
                .OrderByDescending(artist => artist.PlayCount);
            
            var mbzArtists = new List<Artist>();
            foreach (var artist in artists)
            {
                var a = await Task.Run(() =>
                {
                    // TODO this might fail
                    var mbzArtist = MusicBrainz.Search.Artist(arid: artist.Mbid).Data.FirstOrDefault();

                    return new Artist
                    {
                        Name = artist.Name,
                        Playcount = artist.PlayCount,
                        Mbid = artist.Mbid,
                        Country = mbzArtist.Country
                    };
                });

                mbzArtists.Add(a);

                await Task.Delay(1000);
                Console.Write(".");
            }


            foreach (var artist in mbzArtists)
            {
                Console.WriteLine($"{artist.Name.PadRight(40)}{artist.Playcount.ToString().PadRight(15)}{artist.Country.PadRight(20)}{artist.Mbid.PadRight(20)}");
            }

            var cachedArtists = new
            {
                artists = mbzArtists
            };

            var outPath = Path.GetFullPath(outFile);
            File.WriteAllText(outPath, JsonConvert.SerializeObject(cachedArtists, Formatting.Indented));
            Console.WriteLine($"Wrote artists to {outPath}");
        }
    }
}
