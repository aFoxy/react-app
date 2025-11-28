interface WizardStepsProps {
  stepsCount: number
  step: number
}

export default function WizardSteps({ stepsCount, step }: WizardStepsProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: stepsCount }, (_, i) => i++).map((s) => (
        <div
          key={s}
          className={`h-2 flex-1 rounded ${s <= step ? 'bg-blue-600' : 'bg-gray-300'}`}
        />
      ))}
    </div>
  )
}
