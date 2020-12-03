import { Link } from 'react-router-dom';

export default function Home() {
  return(
    <div>
      <p>
        Для перегляду списку співробітників перейдіть за <Link to={`/employees`}>посиланням</Link>
      </p>
    </div>
  )
}