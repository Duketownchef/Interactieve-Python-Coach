import React, { useMemo, useState } from 'react'

const lessons = [
  { id: 1, title: 'Variabelen & Types', time: 12, progress: 100 },
  { id: 2, title: 'If/Else Logica', time: 15, progress: 60 },
  { id: 3, title: 'Lussen (for/while)', time: 18, progress: 0 },
] as const

export default function App() {
  const [selected, setSelected] = useState(2)
  const [code, setCode] = useState(`# Print 1..5, maar vervang 3 door "fizz"\nfor i in range(1,6):\n    print('fizz' if i==3 else i)`)
  const [output, setOutput] = useState<string | null>(null)

  const current = useMemo(()=>lessons.find(l=>l.id===selected),[selected])

  const run = () => {
    // Simuleer output (UI-first). Echte uitvoering kan later via Pyodide.
    setOutput(['1','2','fizz','4','5'].join('\n'))
  }

  return (
    <div className="screen max-w-md mx-auto min-h-full flex flex-col gap-4">
      {/* Topbar */}
      <header className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center font-semibold">Py</div>
          <div className="font-semibold">PyPath Coach</div>
        </div>
        <button className="btn btn-ghost text-sm" onClick={()=>alert('Coming soon: instellingen')}>Instellingen</button>
      </header>

      {/* Hero */}
      <section className="card p-4">
        <div className="text-sm text-slate-600 mb-1">Aanbevolen</div>
        <h1 className="text-xl font-semibold">Welkom terug! Klaar voor de volgende stap?</h1>
        <p className="text-slate-600 text-sm mt-1">Vandaag: <span className="font-medium">If/Else</span> en leesbare code.</p>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary flex-1" onClick={()=>setSelected(2)}>Start</button>
          <button className="btn flex-1" onClick={()=>alert('Coach chat komt in volgende iteratie')}>Coach</button>
        </div>
      </section>

      {/* Lessons list (horizontal scroll for mobile) */}
      <section className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Jouw pad</div>
          <div className="badge">Module voortgang: 60%</div>
        </div>
        <div className="flex gap-3 overflow-x-auto snap-x -mx-2 px-2 pb-1">
          {lessons.map(l => (
            <button key={l.id} onClick={()=>setSelected(l.id)} className={`snap-start min-w-[220px] p-4 rounded-2xl border ${selected===l.id?'border-slate-900 bg-slate-50':'border-slate-200'} text-left`}>
              <div className="text-xs text-slate-600">{l.time} min</div>
              <div className="font-medium mt-1">{l.title}</div>
              <div className="h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-slate-900" style={{width: l.progress + '%'}} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Practice */}
      <section className="card p-0 overflow-hidden flex-1 flex flex-col">
        <div className="p-4 border-b border-slate-200 text-sm">Oefenopdracht • {current?.title}</div>
        <div className="p-4 text-sm text-slate-700">
          Schrijf een programma dat <b>1 t/m 5</b> print. Vervang <b>3</b> door <code className="px-1 py-0.5 bg-slate-100 rounded">"fizz"</code>.
        </div>
        <div className="grid grid-cols-[36px,1fr] bg-white">
          <div className="text-[11px] text-slate-400 p-3 select-none bg-slate-50">
            {Array.from({length: code.split('\n').length}).map((_,i)=>(
              <div key={i} className="leading-6">{i+1}</div>
            ))}
          </div>
          <textarea
            className="p-3 font-mono text-[13px] leading-6 outline-none min-h-[180px] resize-y"
            value={code}
            onChange={e=>setCode(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="p-4 flex gap-2 border-t border-slate-200">
          <button className="btn flex-1" onClick={()=>setCode(code + '\n\n# hint: gebruik i==3')}>Hint</button>
          <button className="btn btn-primary flex-1" onClick={run}>Run</button>
        </div>
        <pre className="p-4 bg-slate-900 text-white text-sm overflow-auto min-h-[120px]">{output or '(geen output – klik Run)'}</pre>
      </section>

      <footer className="py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} PyPath – mobiel, minimalistisch, PWA-ready
      </footer>
    </div>
  )
}
