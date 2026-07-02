export function PremiumGridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(180,83,9,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,83,9,0.03)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.86),rgba(0,0,0,0.28)_58%,transparent)]" />
      <div className="absolute -left-28 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute right-0 top-[34rem] h-[30rem] w-[30rem] rounded-full bg-gold-light/14 blur-3xl" />
    </div>
  );
}
