import clsx from 'clsx'

function Office({
  name,
}: {
  name: string
}) {
  return (
    <address
      className='text-white'

    >
      <strong className='text-white'>
        {name}
      </strong>
      <br />
    </address>
  )
}

export function Offices({
  ...props
}: React.ComponentPropsWithoutRef<'ul'>) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="New York" />
      </li>
      <li>
        <Office name="Los Angeles" />
      </li>
      <li>
        <Office name="Paris" />
      </li>
    </ul>
  )
}
