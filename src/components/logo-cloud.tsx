import { clsx } from 'clsx'

export function LogoCloud({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsx(className, 'space-y-8')}>
      {/* Current Integration */}
      <div className="text-center">
        <p className="text-sm font-medium text-gray-900 mb-4 italic">
          Easy integration with
        </p>
        <img
          alt="Shopify"
          src="/logo-cloud/shopify.svg"
          className="h-12 mx-auto lg:h-16"
        />
      </div>

    </div>
  )
}