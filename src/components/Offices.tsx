import clsx from 'clsx'

function Office({
  name,
  invert = false,
}: {
  name: string
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="New York" invert={invert}>
        </Office>
      </li>
      <li>
        <Office name="Los Angeles" invert={invert}>
        </Office>
      </li>
      <li>
        <Office name="Paris" invert={invert}>
        </Office>
      </li>
    </ul>
  )
}
