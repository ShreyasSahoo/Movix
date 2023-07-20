import { useSelector } from 'react-redux'
import './styles.scss'

const Genres = ({data}) => {
    const {genres} = useSelector(state => state.home)
  return (
    <div className='genres'>
      {data?.map(i =>{
        return (
            <div key={i} className="genre">
                {
                    genres[i]?.name
                }
            </div>
        )
      })}
    </div>
  )
}

export default Genres
