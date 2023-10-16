
import Siderbar from './Siderbar'

interface Props {
    id: string
}

const Dashboard = ({id}: Props) => {
  return (
    <div className='d-flex' style={{height: '100vh'}}>
        <Siderbar id={id}/>
    </div>
  )
}

export default Dashboard