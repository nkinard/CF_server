const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi")
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");

//JH2EsuhCd2nleP5F  

mongoose
  .connect("mongodb+srv://CF-Database:JH2EsuhCd2nleP5F@cf-data.w9vohif.mongodb.net/?retryWrites=true&w=majority&appName=CF-Data")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

const spotlightSchema = new mongoose.Schema({
  name:String,
  summary:String, 
  latitude:Number,
  longitude:Number,
  fishes:String,
  flies:String,
  watertype:String,
  typeofentry:String,
  rating:Number,
  innerimage:String,
  seasons:String,
  outerimage:String
});

const SpotlightSC = mongoose.model("Spotlight", spotlightSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//this is how all json information is used
//src={"http://localhost:3001/api/spotlights" + props.main_image} alt={props.name}/> for client side site
//for the link, change it to the render section so that it links to a live site

let fishes = [
  {
    _id: 1,
    name: "Redfish",
    summary:
      "The Chattooga River is one of the southeast's longest rivers and cuts through Georgia, South Carolina, and North Carolina. This spectacular river is home to hundreds of different species of wildlife. The good thing about this river is that there is easy access at almost any point. There are times where the rapids pick up, but there are definitely spots for wading, kayaking, or bank casting. The best, and most popular, access to the river is off of State Highway 28.",
    outerimage: "redfish.jpg",
    innertopimage: "redfishdrawn.jpg",
    innerbottomimage: "redfishbig.jpg",
    useflies:
      "Since Redfish are saltwater, you are going to need to use saltwater fly patterns. These fish are going to bite completely different from the normal freshwater fish and be a little more aggressive. The best flies include the Clouser Deep Minnow, Deep Baitfish Shad, or even a Squimp.",
    topspots:
      "The best places to find these fish are in saltwater regions where bank or boat fishing is accessible. It is not reccommended to go wading for thein these fish. Top areas include the flats of Charleston and Beufort as well as the bays and lagoons in the Outer Banks.",
  },
  {
    _id: 2,
    name: "Trout",
    summary:
      "Trout are a very sought after species of fish in the Carolinas. There are many species of trout such as rainbow and brown, both with their own vibrant colors. These fish are mainly found in cooler waters such as streams and rivers in the mountains. To find these kind of fish, you are going to want to go to higher elevations such as the Appalachian mountains. Due to the elevations you may experience, these fish are most enjoyable to catch in the spring and fall time.",
    outerimage: "trout.jpg",
    innertopimage: "troutdrawn.jpg",
    innerbottomimage: "troutbig.jpg",
    useflies:
      "Trout are wild fish that love to fish on the natural food sources in the water. In the early Spring and Fall, trout love to bite on nymphs, which are imitations of immature stages of aquatic insects. During hatch times, it is more relevant to use dry flies, which imitate more adult insects. If you want to attract larger trout, you can try to use streamers, which imitate bigger aquatic prey like baitfish and crayfish.",
    topspots:
      "In the Carolinas, trout are best find in the mountain tops of Appalachia. In North Carolina, rivers like the Nantahala and Watauga are prime spots. In South Carolina, the Chattooga River in the right season can prove to be very rewarding for trout fishing.",
  },
  {
    _id: 3,
    name: "Sheepshead",
    summary:
      "Sheepshead fish are a common saltwater fish found piling up inshore around rocks and other underwater debris. They are known for their unique sharp teeth where they eat barnacles, oysters, and various types of shellfish. Due to this, you sohuld opt to use bait that mimics shellfish. The Sheepshead are easily recognizable with their distinctive black and white patters with large teeth. Further, Sheepshead are not very migratory and only move offshore to spawn in the Spring time.",
    outerimage: "sheepshead.jpg",
    innertopimage: "sheepdrawn.jpg",
    innerbottomimage: "sheepshbig.jpg",
    useflies:
      "Due to their eating habits, you are going to want to get flies that mimic shellfish and small saltwater prey. Flies like the Straight-Shooter Crab, Marsh Mohawk, and the Longhorn Crap are effective at catching this fish.",
    topspots:
      "Sheepshead like to pile up around rocks and other debris. Due to this fact, it is best to go to brackish coastal waters around wharfs, shipwrecks, rocks, or other pilings.",
  },
  {
    _id: 4,
    name: "Bass",
    summary:
      "Bass are a native species to the Carolinas and come in many Varieties such as smallmouth, largemouth, and spotted. One of the more abundant fish in this area, bass love to be found in lakes, ponds, streams, and rivers. Bass love to eat just about anything such as crayfish, frogs, insects, minnows, earthworms and sometimes even other bass. Due to their eating habits and predatory nature, bass can be dirty if the environment they live in allows for it. Make sure to always know your local body of water for any pollutants that may exist.",
    outerimage: "largemouthbass.jpg",
    innertopimage: "bassdrawn.jpg",
    innerbottomimage: "bassbig.jpg",
    useflies:
      "Catching bass has always been a good past-time in the Carolinas. Since these fish eat on anything in <i>their</i> environment, you need to match your fly to the surrounding ecosystem. However, to get started, some general flies that are sure workers are Woolly Buggers, Hoppers, Poppers, and Damselfy patterns.",
    topspots:
      "There is almost no spot in the Carolians that does not house some kind of bass. To be more accurate, bass do love to be in ponds, lakes, and streams and will generally pile up under rocks, twigs, and anything that provides cover. Their strategy as a predator is to hide in small holes and jump out at prey that swims by.",
  },
];

let flies = [
  {
    _id: 1,
    name: "Dry Fly",
    summary:
      "Dry flies are a fly that imitate an adult insect. This technique of fly fishing is best during seasons of insect hatches, when the fish are actively feeding on adult flies. Selecting the right fly pattern based on the water and ecosystem is key to making them effective. To cast, simply cast the fly out and make sure it sits carefully on the water, just as an adult fly would.",
    outerimage: "dryfly.jpg",
    innertopimage: "dryflytypes.jpg",
    innerbottomimage: "dryflyspec.jpg",
    purpose:
      "Dry flies are best used to imitate the adult stage of an aquatic insect. Some common flies in the Carolinas include mayflies, toneflies, and caddisflies. These flies are meant to drift on top of the water to feed, and then attract fish that like to feed on the surface. Make sure to choose the right fly based on your local environment. Some variables that can attribute to choosing the right fly include the season, the color of the water, the color of the environment, and what fish might lurk.",
    topfish:
      "Top fish in the Carolinas that eat dry flies are fish like brown and rainbow trout. These fish love to surface feed on hatching insects. The best seasons are often in the Spring and Fall times. Another common fish to get are smallmouth bass, however they are not as unique.",
  },
  {
    _id: 2,
    name: "Emerger Fly",
    summary:
      "Emerger flies are lightweight flies that mimic the hatching of aquatic prey. Insects such as mayflies and caddis are usually the most popular insects that these flies try to mimic. They are designed to drift with the current of the water and slowly submerge just below the surface. This is to imitate the action of an insect hatching and leaving the steam bed to rise and fly away.",
    outerimage: "emerger.jpg",
    innertopimage: "emergertype.jpg",
    innerbottomimage: "emergerspec.jpg",
    purpose:
      "This fly imitates emerging insects ready to fly away into their new life. Some common varieties used by flycasters include the Blue Winged Olive, the Pale Morning Dun, and the March Brown Mayflies. However, do note that the main flies these are trying to imitate are the Caddis Flies, May Flies, and Midges and that to get best results you must try to match your environment.",
    topfish:
      "These flies work best in streams, rivers, and small waterways in freshwater. Due to this fact, bass, brook trout, rainbow trout, and brown trout are best.",
  },
  {
    _id: 3,
    name: "Nymph Fly",
    summary:
      "Nymph flies are artificial flies that try to mimic the very early stages of aquatic life. These flies are used more in the depths of the water. Since these mimic the very immature stage, these can include both flies and worms.",
    outerimage: "nymph.jpg",
    innertopimage: "nymphtypes.jpg",
    innerbottomimage: "nymphflyspec.jpg",
    purpose:
      "Due to trying to mimic an immature insect that is eat to reach the surface, these flies are going to be submerged. Due to this, their patterns need to look authentic. In this area, some common nymphs include the Pheasant Tail Nymph, the Prince Nymph, and Copper John.",
    topfish:
      "Top fish that love nymphs are going to be found in rivers, streams, ponds, and lakes. This includes the many varieties of trout and bass!",
  },
  {
    _id: 4,
    name: "Wet Fly",
    summary:
      "Wet flies are a very large type of bait used by flycasters. These flies mimic any aquatic prey that finds itself underwater. The advantage of wet flies is that they can be used in both fresh and saltwaters. Also, wet flies can come in a plethora of designs, shapes, and patterns.",
    outerimage: "wetfly.jpg",
    innertopimage: "wettypes.jpg",
    innerbottomimage: "wetflyspec.jpg",
    purpose:
      "Since wet flies are desgined to be submerged, many of these flies are going to be color coordinated to their respective river bed. Some common ones include the Gold Ribbed Hare's Ear, and the Woolly Bugger.",
    topfish:
      "Top fish for these include trout, bass, carp, redfish, and grayling.",
  },
];

app.get("/api/spotlights", async(req, res) => {
  const spotlights = await SpotlightSC.find();
  res.send(spotlights);
});

app.post("/api/spotlights", upload.fields([
  { name: 'outerimage', maxCount: 1 },
  { name: 'innerimage', maxCount: 1 }]), async(req, res) => {
    const result = validateSpotlight(req.body);

    if(result.error){
        console.log("I have an error");
        res.status(400).send(result.error.details[0].message);
        return;
    };

    const spot = new SpotlightSC({
        name: req.body.name,
        summary:req.body.summary,
        latitude: parseFloat(req.body.latitude),
        longitude: parseFloat(req.body.longitude),
        fishes: req.body.fishes,
        flies:req.body.flies,
        watertype: req.body.watertype,
        typeofentry: req.body.typeofentry,
        rating: req.body.rating,
        innerimage: '',
        seasons: req.body.seasons,
        outerimage: '',
    });

    if (req.files && req.files['outerimage'] && req.files['outerimage'][0]) {
      spot.outerimage = req.files['outerimage'][0].filename;

      console.log(spot.outerimage);
    };
  
    if (req.files && req.files['innerimage'] && req.files['innerimage'][0]) {
      spot.innerimage = req.files['innerimage'][0].filename;

      console.log(spot.innerimage);
    };

    const newSpot = await spot.save();
    res.status(200).send(newSpot);
});

app.put("/api/spotlights/:id", upload.fields([
  { name: 'outerimage', maxCount: 1 },
  { name: 'innerimage', maxCount: 1 }]), async(req,res)=>{

    const result = validateSpotlight(req.body);

    if(result.error){
      res.status(400).send(result.error.details[0].message);
      return;
    }

    const fieldsToUpdate = {
      name:req.body.name,
      summary:req.body.summary,
      latitude:req.body.latitude,
      longitude:req.body.longitude,
      fishes:req.body.fishes,
      flies:req.body.flies,
      watertype:req.body.watertype,
      typeofentry:req.body.typeofentry,
      rating:req.body.rating,
      seasons:req.body.seasons
    }

    if (req.files && req.files['outerimage'] && req.files['outerimage'][0]) {
      fieldsToUpdate.outerimage = req.files['outerimage'][0].filename;
      console.log(fieldsToUpdate.outerimage);
    };
  
    if (req.files && req.files['innerimage'] && req.files['innerimage'][0]) {
      fieldsToUpdate.innerimage = req.files['innerimage'][0].filename;
      console.log(fieldsToUpdate.innerimage);
    };

    const wentThrough = await SpotlightSC.updateOne({_id:req.params.id}, fieldsToUpdate);
    const spot = await SpotlightSC.findOne({_id:req.params.id});

    res.status(200).send(spot);
});

app.delete("/api/spotlights/:id", async(req, res) =>{
  const spot = await SpotlightSC.findByIdAndDelete(req.params.id);

  res.status(200).send(spot);
});

//update form on the other side so that names match both ways!
const validateSpotlight = (spotlight) => {
    const schema = Joi.object({
        _id:Joi.allow(""),
        name:Joi.string().min(3).required(),
        summary: Joi.string().min(3).required(),
        longitude:Joi.number().required(),
        latitude:Joi.number().required(),
        fishes:Joi.string().min(3).required(),
        flies:Joi.string().min(3).required(),
        watertype:Joi.string().min(3).required(),
        typeofentry:Joi.string().min(3).required(),
        rating:Joi.number().required(),
        seasons:Joi.string().min(3).required()
    });

    return schema.validate(spotlight);
};

app.get("/api/fishes", (req, res) => {
  res.send(fishes);
});

app.get("/api/flies", (req, res) => {
  res.send(flies);
});

app.listen(3001, () => {
  console.log("i am listening");
});
