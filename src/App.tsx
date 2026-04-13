import { useEffect, useMemo, useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

type WeekPlan = {
  week: string
  test: string
  chapters: string[]
}

type ProgressMap = Record<string, Record<string, boolean>>

const initialData: WeekPlan[] = [
  {
    week: 'Week 1',
    test: 'Part Test 1',
    chapters: [
      'Basic Maths',
      'Units & Dimensions',
      'Vectors',
      'Kinematics',
      'Laws of Motion',
      'Work, Energy & Power',
      'System of Particles',
      'Rotation',
      'Some Basic Concepts',
      'Atomic Structure',
      'Periodic Table',
      'Chemical Equilibrium',
      'Redox Reactions',
      'Set Theory',
      'Inequalities',
      'Logarithm',
      'Modulus',
      'Functions (Basics)',
      'Quadratic Equations',
      'Complex Numbers',
      'Trigonometry',
      'Sequences',
      'Living World',
      'Biological Classification',
      'Plant Kingdom',
      'Animal Kingdom',
      'Morphology',
      'Anatomy',
      'Frog',
      'Cell',
      'Cell Division',
    ],
  },
  {
    week: 'Week 2',
    test: 'Part Test 2',
    chapters: [
      'Properties of Matter',
      'Fluid Mechanics',
      'Waves',
      'Kinetic Theory of Gases',
      'Thermodynamics',
      'Simple Harmonic Motion',
      'Gravitation',
      'Thermodynamics (Chem)',
      'Chemical Bonding',
      'Introduction to Organic Chemistry',
      'Hydrocarbons',
      'Straight Line',
      'Circle',
      'Parabola',
      'Ellipse',
      'Hyperbola',
      'Permutations',
      'Probability',
      'Statistics',
      'Binomial Theorem',
      'Photosynthesis',
      'Respiration',
      'Growth',
      'Breathing',
      'Circulation',
      'Excretion',
      'Neural Control',
      'Chemical Control',
    ],
  },
  {
    week: 'Week 3',
    test: 'Part Test 3',
    chapters: [
      'Complete Class 11 Physics',
      'Complete Class 11 Chemistry',
      'Complete Class 11 Mathematics',
      'Complete Class 11 Biology',
    ],
  },
  {
    week: 'Week 4',
    test: 'Part Test 4',
    chapters: [
      'Electrostatics',
      'Capacitors',
      'Current Electricity',
      'Magnetism',
      'Electromagnetic Induction',
      'Alternating Current',
      'Solutions',
      'Electrochemistry',
      'Chemical Kinetics',
      'Coordination Compounds',
      'd & f Block',
      'Relations',
      'Functions',
      'Limits',
      'Continuity',
      'Differentiation',
      'Applications of Derivatives',
      'Reproduction',
      'Genetics',
      'Molecular Biology',
      'Evolution',
    ],
  },
  {
    week: 'Week 5',
    test: 'Part Test 5',
    chapters: [
      'EM Waves',
      'Ray Optics',
      'Wave Optics',
      'Dual Nature of Matter',
      'Atomic Structure (Modern)',
      'Nuclear Physics',
      'Semiconductors',
      'Haloalkanes & Haloarenes',
      'Alcohols Phenols Ethers',
      'Aldehydes Ketones Carboxylic Acids',
      'Amines',
      'Biomolecules',
      'Integrals',
      'Differential Equations',
      'Matrices',
      '3D Geometry',
      'Vectors',
      'Microbes',
      'Human Health',
      'Biotechnology',
      'Ecosystem',
      'Biodiversity',
    ],
  },
  {
    week: 'Week 6',
    test: 'Part Test 6',
    chapters: [
      'Complete Class 12 Physics',
      'Complete Class 12 Chemistry',
      'Complete Class 12 Mathematics',
      'Complete Class 12 Biology',
    ],
  },
]

const storageKey = 'iat-progress'

function getCompletedCount(chapters: string[], weekProgress: Record<string, boolean> | undefined) {
  return chapters.filter((chapter) => weekProgress?.[chapter]).length
}

export default function App() {
  const [progress, setProgress] = useState<ProgressMap>(() => {
    const saved = localStorage.getItem(storageKey)

    if (!saved) {
      return {}
    }

    try {
      return JSON.parse(saved) as ProgressMap
    } catch {
      localStorage.removeItem(storageKey)
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress))
  }, [progress])

  const totals = useMemo(() => {
    const totalChapters = initialData.reduce((sum, week) => sum + week.chapters.length, 0)
    const completedChapters = initialData.reduce(
      (sum, week) => sum + getCompletedCount(week.chapters, progress[week.week]),
      0,
    )
    const weeksFinished = initialData.filter(
      (week) => getCompletedCount(week.chapters, progress[week.week]) === week.chapters.length,
    ).length

    return {
      totalChapters,
      completedChapters,
      weeksFinished,
      percentage: totalChapters === 0 ? 0 : Math.round((completedChapters / totalChapters) * 100),
    }
  }, [progress])

  const toggleChapter = (week: string, chapter: string) => {
    setProgress((previous) => ({
      ...previous,
      [week]: {
        ...previous[week],
        [chapter]: !previous[week]?.[chapter],
      },
    }))
  }

  const resetProgress = () => {
    setProgress({})
  }

  return (
    <main className="planner-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">IAT study dashboard</p>
          <h1>IAT Prep Planner</h1>
          <p className="hero-text">
            Track each chapter, keep your weekly tests visible, and make the six-week
            sprint feel manageable.
          </p>

          <div className="stats-grid">
            <article className="stat-card">
              <span className="stat-value">{totals.completedChapters}</span>
              <span className="stat-label">Chapters done</span>
            </article>
            <article className="stat-card">
              <span className="stat-value">{totals.weeksFinished}/6</span>
              <span className="stat-label">Weeks completed</span>
            </article>
            <article className="stat-card">
              <span className="stat-value">{totals.percentage}%</span>
              <span className="stat-label">Overall progress</span>
            </article>
          </div>

          <div className="progress-block">
            <div className="progress-meta">
              <span>Master checklist</span>
              <span>
                {totals.completedChapters} / {totals.totalChapters}
              </span>
            </div>
            <div className="progress-bar" aria-hidden="true">
              <span style={{ width: `${totals.percentage}%` }} />
            </div>
          </div>

          <button type="button" className="reset-button" onClick={resetProgress}>
            Reset progress
          </button>
        </div>

        <div className="hero-visual">
          <img src={heroImg} alt="Study planner illustration" />
        </div>
      </section>

      <section className="weeks-section" aria-label="Weekly plan">
        {initialData.map((week) => {
          const completed = getCompletedCount(week.chapters, progress[week.week])
          const isDone = completed === week.chapters.length

          return (
            <article key={week.week} className="week-card">
              <div className="week-header">
                <div>
                  <p className="week-kicker">{week.test}</p>
                  <h2>{week.week}</h2>
                </div>
                <div className={`week-badge${isDone ? ' week-badge-complete' : ''}`}>
                  {completed}/{week.chapters.length}
                </div>
              </div>

              <ul className="chapter-list">
                {week.chapters.map((chapter) => {
                  const checked = progress[week.week]?.[chapter] ?? false

                  return (
                    <li key={`${week.week}-${chapter}`} className="chapter-item">
                      <label className={`chapter-label${checked ? ' chapter-label-checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleChapter(week.week, chapter)}
                        />
                        <span>{chapter}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </article>
          )
        })}
      </section>
    </main>
  )
}
