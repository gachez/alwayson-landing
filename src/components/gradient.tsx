import { clsx } from 'clsx'

export function Gradient({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <>
      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
      <div
        {...props}
        className={clsx(
          className,
          'bg-gradient-to-br from-sky-200 via-indigo-300 to-indigo-600 sm:bg-gradient-to-r',
          'animate-gradient',
        )}
      />
    </>
  )
}

export function GradientBackground() {
  return (
    <>
      <style>{`
        @keyframes gradient-bg {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(-10deg);
          }
          50% {
            transform: translateY(-20px) rotate(-12deg);
          }
        }
        
        .animate-gradient-float {
          background-size: 200% 200%;
          animation: float 10s ease-in-out infinite, gradient-bg 8s ease infinite;
        }
      `}</style>
      <div className="relative mx-auto max-w-7xl">
        <div
          className={clsx(
            'absolute -top-44 -right-60 h-60 w-xl transform-gpu md:right-0',
            'bg-gradient-to-br from-sky-200 via-indigo-300 to-indigo-600',
            'rounded-full blur-3xl',
            'animate-gradient-float',
          )}
        />
      </div>
    </>
  )
}

// Demo component to showcase the animations
export default function Demo() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="space-y-12">
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">Animated Gradient</h2>
          <Gradient className="h-64 rounded-2xl shadow-2xl" />
        </div>
        
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">Gradient Background with Float</h2>
          <div className="relative h-96 bg-slate-800 rounded-2xl overflow-hidden">
            <GradientBackground />
            <div className="relative z-10 flex items-center justify-center h-full">
              <p className="text-white text-xl font-semibold">Content goes here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}