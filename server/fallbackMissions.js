/**
 * Generates tailored outdoor fallback missions when AI API is unavailable.
 */

const getFallbackMission = ({ time = '20 min', surroundings = 'park', energy = 'normal', weather = 'Clear' }) => {
  const isRainy = /rain|drizzle|shower|storm|thunder/i.test(weather);
  const timeNum = parseInt(time) || 20;

  const templates = {
    rainy: {
      title: "The Petrichor & Porch Reset",
      intro: "Step just outside under a covered spot. Experience the calming rhythm of falling rain and crisp air.",
      tasks: [
        "Find a sheltered porch or awning and stand still for 60 seconds listening to the rain.",
        "Spot 3 leaves glistening with fresh rainwater droplets.",
        "Take 5 deep breaths, focusing entirely on the fresh earthy smell of wet soil and air.",
        "Walk a short sheltered path, observing how puddles mirror the sky.",
        "Touch a dry tree trunk or wall protected from the rain and feel its cold texture."
      ]
    },
    terrace: {
      title: "The Rooftop Horizon Breeze",
      intro: "Step onto your terrace or balcony to stretch your vision beyond room walls.",
      tasks: [
        "Stand at the ledge boundary and look at the furthest visible horizon line for 30 seconds.",
        "Identify 4 different types of clouds or light patterns in the sky above.",
        "Close your eyes and let the open air cool your face while taking 3 slow deep breaths.",
        "Spot 2 birds or insects navigating the air currents around your high viewpoint.",
        "Do a gentle shoulder roll and full-body stretch toward the open sky."
      ]
    },
    park: {
      chill: {
        title: "The Canopy Unplug Expedition",
        intro: "Immerse yourself gently in the green surroundings. No rush, just pure natural focus.",
        tasks: [
          "Walk until you find the largest tree in sight and examine its bark patterns.",
          "Sit or stand quietly near grass and notice 3 distinct shades of green around you.",
          "Listen carefully for 1 full minute and count how many unique bird calls you hear.",
          "Pick up a fallen leaf or pinecone, notice its texture, then place it back gently.",
          "Walk slowly back with your phone in your pocket, feeling your feet press into the earth."
        ]
      },
      active: {
        title: "The Park Pulse & Sprint Micro-Quest",
        intro: "Get your heart rate up and awaken your senses in the open park space.",
        tasks: [
          "Briskly walk or jog for 3 minutes toward a distant landmark tree or bench.",
          "Find a sturdy wooden bench or hill for 15 elevated step-ups or calf raises.",
          "Locate 5 different plant or tree species and touch each leaf briefly as you pass.",
          "Do 10 deep jumping jacks or dynamic arm swings facing the open sky.",
          "Walk back at a fast pace while focusing on long, rhythmic inhalations."
        ]
      },
      normal: {
        title: "The Green Earth Reset Walk",
        intro: "A balanced outdoor break to clear your mind and reconnect with your immediate environment.",
        tasks: [
          "Walk along a grassy path without checking any notification for 5 continuous minutes.",
          "Find 3 natural textures: smooth stone, rough bark, and soft moss or clover.",
          "Pause by a sunny spot (or cool shadow) and feel the temperature shift on your skin.",
          "Observe small natural movements around you—leaves swaying, insects, or ripples.",
          "Take 10 deliberate slow steps, feeling complete grounding in every stride."
        ]
      }
    },
    street: {
      title: "The Urban Explorer Mindful Stroll",
      intro: "Turn ordinary city sidewalks into a sensory grounding adventure.",
      tasks: [
        "Walk down your street looking UP at architecture and sky rather than down at pavement.",
        "Spot 3 unexpected patches of green (flowers in window boxes, weeds in brick cracks).",
        "Find a quiet corner or street tree and take 4 deep, calm breaths.",
        "Notice 2 subtle sounds you usually ignore: wind rustling leaves, distant footsteps.",
        "Walk back taking the slightly longer scenic route back to your doorstep."
      ]
    },
    campus: {
      title: "The Open Quad Senses Refresh",
      intro: "Step out into campus air, stretch your eyesight, and step away from study screens.",
      tasks: [
        "Walk across the open quad or courtyard, keeping your eyes on the horizon.",
        "Find a grassy patch or bench and do a 60-second neck and spine stretch.",
        "Count 4 distinct natural elements around the campus buildings (trees, stone, soil, sun).",
        "Take a slow 3-minute stroll without touching any electronic device.",
        "Inhale deeply twice, letting out a heavy sigh to release all cognitive tension."
      ]
    }
  };

  if (isRainy) return templates.rainy;
  if (surroundings === 'terrace') return templates.terrace;
  if (surroundings === 'campus') return templates.campus;
  if (surroundings === 'street') return templates.street;
  if (templates.park[energy]) return templates.park[energy];

  return templates.park.normal;
};

module.exports = { getFallbackMission };
