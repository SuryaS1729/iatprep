import { useState, useEffect } from "react";

const initialData = [
  {
    week: "Week 1",
    test: "Part Test 1",
    chapters: [
      // Physics
      "Basic Maths","Units & Dimensions","Vectors","Kinematics","Laws of Motion","Work, Energy & Power","System of Particles","Rotation",
      // Chemistry
      "Some Basic Concepts","Atomic Structure","Periodic Table","Chemical Equilibrium","Redox Reactions",
      // Mathematics
      "Set Theory","Inequalities","Logarithm","Modulus","Functions (Basics)","Quadratic Equations","Complex Numbers","Trigonometry","Sequences",
      // Biology
      "Living World","Biological Classification","Plant Kingdom","Animal Kingdom","Morphology","Anatomy","Frog","Cell","Cell Division"
    ]
  },
  {
    week: "Week 2",
    test: "Part Test 2",
    chapters: [
      // Physics
      "Properties of Matter","Fluid Mechanics","Waves","Kinetic Theory of Gases","Thermodynamics","Simple Harmonic Motion","Gravitation",
      // Chemistry
      "Thermodynamics (Chem)","Chemical Bonding","Introduction to Organic Chemistry","Hydrocarbons",
      // Mathematics
      "Straight Line","Circle","Parabola","Ellipse","Hyperbola","Permutations","Probability","Statistics","Binomial Theorem",
      // Biology
      "Photosynthesis","Respiration","Growth","Breathing","Circulation","Excretion","Neural Control","Chemical Control"
    ]
  },
  {
    week: "Week 3",
    test: "Part Test 3",
    chapters: [
      "Complete Class 11 Physics","Complete Class 11 Chemistry","Complete Class 11 Mathematics","Complete Class 11 Biology"
    ]
  },
  {
    week: "Week 4",
    test: "Part Test 4",
    chapters: [
      // Physics
      "Electrostatics","Capacitors","Current Electricity","Magnetism","Electromagnetic Induction","Alternating Current",
      // Chemistry
      "Solutions","Electrochemistry","Chemical Kinetics","Coordination Compounds","d & f Block",
      // Mathematics
      "Relations","Functions","Limits","Continuity","Differentiation","Applications of Derivatives",
      // Biology
      "Reproduction","Genetics","Molecular Biology","Evolution"
    ]
  },
  {
    week: "Week 5",
    test: "Part Test 5",
    chapters: [
      // Physics
      "EM Waves","Ray Optics","Wave Optics","Dual Nature of Matter","Atomic Structure (Modern)","Nuclear Physics","Semiconductors",
      // Chemistry
      "Haloalkanes & Haloarenes","Alcohols Phenols Ethers","Aldehydes Ketones Carboxylic Acids","Amines","Biomolecules",
      // Mathematics
      "Integrals","Differential Equations","Matrices","3D Geometry","Vectors",
      // Biology
      "Microbes","Human Health","Biotechnology","Ecosystem","Biodiversity"
    ]
  },
  {
    week: "Week 6",
    test: "Part Test 6",
    chapters: [
      "Complete Class 12 Physics","Complete Class 12 Chemistry","Complete Class 12 Mathematics","Complete Class 12 Biology"
    ]
  }
];

export default function App() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("iat-progress");
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("iat-progress", JSON.stringify(progress));
  }, [progress]);

  const toggle = (week, chapter) => {
    setProgress((prev) => ({
      ...prev,
      [week]: {
        ...prev[week],
        [chapter]: !prev[week]?.[chapter]
      }
    }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">IAT Prep Planner</h1>

      {initialData.map((w) => (
        <div key={w.week} className="mb-6 p-4 border rounded-2xl shadow">
          <h2 className="text-xl font-semibold">{w.week}</h2>
          <p className="text-gray-600 mb-2">{w.test}</p>

          <ul>
            {w.chapters.map((ch) => (
              <li key={ch} className="flex items-center gap-2 my-1">
                <input
                  type="checkbox"
                  checked={progress[w.week]?.[ch] || false}
                  onChange={() => toggle(w.week, ch)}
                />
                <span
                  className={
                    progress[w.week]?.[ch]
                      ? "line-through text-gray-400"
                      : ""
                  }
                >
                  {ch}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
