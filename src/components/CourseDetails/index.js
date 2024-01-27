import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {apiStatus: apiStatusConstant.initial, courseDetailList: {}}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updateData = {
        id: data.course_details.id,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }
      this.setState({
        courseDetailList: updateData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderSuccessViewInCourseDetails = () => {
    const {courseDetailList} = this.state
    const {description, imageUrl, name} = courseDetailList

    return (
      <div className="courseDetailContainer">
        <div className="sub-container">
          <img src={imageUrl} alt={name} className="image-course-details" />
          <div className="details-para-container">
            <h1 className="course-details-heading">{name}</h1>
            <p className="para-course-details">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderFailureViewInCourseDetails = () => (
    <div className="loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.getCourseDetails} className="btn" type="button">
        Retry
      </button>
    </div>
  )

  renderInProgressInCourseDetails = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderCourseDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inprogress:
        return this.renderInProgressInCourseDetails()
      case apiStatusConstant.success:
        return this.renderSuccessViewInCourseDetails()
      case apiStatusConstant.failure:
        return this.renderFailureViewInCourseDetails()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCourseDetails()}
      </>
    )
  }
}

export default CourseDetails