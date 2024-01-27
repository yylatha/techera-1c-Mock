import {Link} from 'react-router-dom'
import './index.css'

const CourseList = props => {
  const {courseDetails} = props
  const {name, logoUrl, id} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="li-container">
        <img src={logoUrl} alt={name} className="image-course" />
        <p className="course-name-para">{name}</p>
      </li>
    </Link>
  )
}

export default CourseList