import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseList from '../CourseList'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstant.initial, listOfCourse: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstant.inprogress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updateData = data.courses.map(eachData => ({
        id: eachData.id,
        logoUrl: eachData.logo_url,
        name: eachData.name,
      }))
      this.setState({
        listOfCourse: updateData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderSuccessView = () => {
    const {listOfCourse} = this.state

    return (
      <div className="success-container">
        <h1 className="course-heading">Courses</h1>
        <ul className="ul-container">
          {listOfCourse.map(eachCourse => (
            <CourseList key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
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
      <button onClick={this.getData} className="btn" type="button">
        Retry
      </button>
    </div>
  )

  renderInProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderHomeRoute = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inprogress:
        return this.renderInProgress()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderHomeRoute()}
      </>
    )
  }
}

export default Home