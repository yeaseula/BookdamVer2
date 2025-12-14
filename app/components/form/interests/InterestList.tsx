import interest from '../Interest/category.json'
import InterestGroup from './InterestGroup'

export default function InterestLists() {

    return (
        <div className='mt-3'>
        {interest.map((topic)=>(
            <InterestGroup key={topic.value} topic={topic}/>
        ))}
        </div>
    )
}