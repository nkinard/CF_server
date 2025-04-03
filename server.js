const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

//this is how all json information is used
//src={"http://localhost:3001/api/spotlights" + props.main_image} alt={props.name}/> for client side site
//for the link, change it to the render section so that it links to a live site
let spotlights = 
[
    {
        "id": 1,
        "name": "Chattooga",
        "summary": "The Chattooga River is one of the southeast's longest rivers and cuts through Georgia, South Carolina, and North Carolina. This spectacular river is home to hundreds of different species of wildlife. The good thing about this river is that there is easy access at almost any point. There are times where the rapids pick up, but there are definitely spots for wading, kayaking, or bank casting. The best, and most popular, access to the river is off of State Highway 28.",
        "latitude":"34.9267293",
        "longitude":"-83.3724446",
        "fishes": "Rainbow and Brown Trout",
        "flies": "Dry Flies: Yellow Sally, Elk Hair Caddis, Griffith's Gnat Nymph Flies: Zebra Midge, Golden Stonefly, Rainbow Warrior",
        "watertype": "Freshwater River",
        "typeofentry": "Public",
        "rating": 5,
        "innerimage": "flyfishchat.jpg",
        "seasons":"Best is Summer, Fall is acceptable",
        "outerimage": "chattooga.jpg"
    },
    {
        "id": 2,
        "name": "Saluda",
        "summary": "The Saluda River, named after an Algonquian-speaking tribe, runs from the Blue Ridge Mountains to Columbia, South Carolina's Lake Murray. The Saluda water is very temperate and offers great abundance in fish species. The North Saluda, near Greenville SC, is often more abundant in fish as the water is cooler, and as you get to the southern region near the dam in Lake Murray, the water temperature increases. Overall, this river is great for year round fishing and provides young anglers a good starting point.",
        "latitude":"34.214849",
        "longitude":"-81.957689",
        "fishes": "Rainbow, Brown, Brook Trout, and Striped Bass",
        "flies": "Dry Flies: Elk Hair Caddis, Slate Drake, Little Blue Duns. Nymphs: Woolly Worm, Prince, Stonefly",
        "watertype": "Freshwater River",
        "typeofentry": "Public",
        "rating": 4,
        "innerimage": "flyfishsaluda.jpg",
        "seasons":"Best is Spring and Summer, Fall is acceptable",
        "outerimage":"saluda.jpg"
    },
    {
        "id": 3,
        "name": "Watauga",
        "summary": "This large stream runs in the mountains of west North Carolina and on into Tennessee. Due to its high elevation and cold waters, this river is abundant in many trout species. This area is really good for year-round fishing and provides anglers of any skill with a nice challenge.",
        "latitude":"36.240432",
        "longitude":"-81.828849",
        "fishes": "Rainbow , Brown, and Brook Trout",
        "flies": "Dry Flies: Adams, Morgan's Midge Nymph Flies: Pheasant Tail Nymph, Hare's Ear Nymph Streamers: Wooly buggers",
        "watertype": "Freshwater",
        "typeofentry": "Public",
        "rating": 5,
        "innerimage": "flyfishwata.jpg",
        "seasons":"Best is Spring/Summer, however year-round fishing is acceptable",
        "outerimage":"watauga.jpg"
    },
    {
        "id": 4,
        "name": "Mitchell",
        "summary": "The Mitchell River is a large freshwater river that runs in western North Carolina at the base of the Appalachian Mountains. This river is known for its delayed harvest trout where anglers are only allowed to keep catches during certain regulations set forth by the state. Due to this, the populations in this river are abundant and very rewarding. There are many access points near Kapps Mill along River Road. Go and try it out!",
        "latitude":"36.353972",
        "longitude":"-80.829847",
        "fishes": "Rainbow and Brown Trout",
        "flies": "Dry Fly: Adams Fly, Nymph: Flashback Pheasant Tail",
        "watertype": "Freshwater",
        "typeofentry": "Public",
        "rating": 4,
        "innerimage": "flyfishmitch.jpg",
        "seasons":"Best is Spring and Fall",
        "outerimage":"mitchell.jpg"
    },
    {
        "id": 5,
        "name": "Nantahala",
        "summary": "The Nantahala River, located in western North Carolina, is renowned for its crystal-clear waters and excellent trout fishing opportunities. The river flows through the Nantahala National Forest, offering stunning scenery and diverse fishing experiences. The upper section is known for its wild trout, while the lower section is regularly stocked. The Nantahala Gorge provides challenging whitewater rafting, but there are also plenty of wadeable sections for fly fishing enthusiasts",
        "latitude":"35.3295",
        "longitude":"-83.6743",
        "fishes": "Rainbow, Brown, and Brook Trout",
        "flies": "Dry Flies: Adams, Blue Wing Olive, Elk Hair Caddis. Nymphs: Pheasant",
        "watertype": "Freshwater",
        "typeofentry": "Public",
        "rating": 5,
        "innerimage": "flyfishnan.jpg",
        "seasons":"Best is Spring and Fall, Summer is acceptable",
        "outerimage":"nantahala.jpg"
    },
    {
        "id": 6,
        "name": "Davidson",
        "summary": "The Davidson River, located in Transylvania County, North Carolina, is a premier trout fishing destination. Known for its large and challenging brown trout, the river flows through the Pisgah National Forest. The Davidson offers a mix of wide, easily accessible sections and more remote, boulder-strewn areas. The river's catch-and-release section near the Pisgah Fish Hatchery is particularly popular among fly fishing enthusiasts",
        "latitude":"35.2728",
        "longitude":"-82.7339",
        "fishes": "Brown, Rainbow, and Brook Trout",
        "flies": "Dry Flies: Parachute Adams, Sulphur Dun, Elk Hair Caddis. Nymphs: Copper John, Zebra Midge, Pheasant Tail",
        "watertype": "Freshwater",
        "typeofentry": "Public",
        "rating": 4,
        "innerimage": "flyfishdavid.jpg",
        "seasons":"Best is Spring and Fall, Winter is acceptable",
        "outerimage":"davidson.jpg"
    },
    {
        "id": 7,
        "name": "Wilson Creek",
        "summary": "Wilson Creek, a Wild and Scenic River in North Carolina, offers excellent trout fishing in a beautiful gorge setting. Located in the Pisgah National Forest, the creek features a mix of plunge pools, pocket water, and boulder-strewn runs. The upper section is known for its wild trout, while the lower sections are stocked. Wilson Creek also offers opportunities for hiking and camping, making it a great destination for outdoor enthusiasts",
        "latitude":"35.8831",
        "longitude":"-81.7828",
        "fishes": "Brown, Rainbow, and Brook Trout",
        "flies": "Dry Flies: Stimulator, Royal Wulff, Parachute Adams. Nymphs: Gold-Ribbed Hare's Ear, Pheasant Tail, Stone Fly",
        "watertype": "Freshwater",
        "typeofentry": "Public",
        "rating": 5,
        "innerimage": "flyfishwilson.jpg",
        "seasons":"Best is Spring and Fall, Summer is acceptable",
        "outerimage":"wilson.jpg"
    },
    {
        "id": 8,
        "name": "Tuckasegee",
        "summary": "The Tuckasegee River, often called the 'Tuck' by locals, is a major waterway in western North Carolina. It offers diverse fishing opportunities, from wide, easily wadeable sections to deep pools. The river is known for its healthy population of wild and stocked trout, as well as smallmouth bass in the lower sections. The Delayed Harvest section near Webster provides excellent catch-and-release fishing from October through early June",
        "latitude":"35.3731",
        "longitude":"-83.2265",
        "fishes": "Rainbow, Brown Trout, and Smallmouth Bass",
        "flies": "Dry Flies: Light Cahill, Blue Wing Olive, Elk Hair Caddis. Nymphs: Copper John, Prince Nymph, Woolly Bugger",
        "watertype": "Freshwater",
        "typeofentry": "Public",
        "rating": 4,
        "innerimage": "flyfishtuck.jpg",
        "seasons":"Best is Spring and Fall, Winter is acceptable",
        "outerimage":"tuckasegee.jpg"
    }
];

app.get("/api/spotlights", (req, res)=>{
    res.send(spotlights);
});

app.listen(3001, ()=>{
    console.log("i am listening");
});