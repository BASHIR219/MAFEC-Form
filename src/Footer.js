import React, { Component } from 'react'
import logo from './mafec-logo.png'
import './App.css';

export default class Footer extends Component {
    render() {
        return (
            <footer style={{ backgroundColor: this.props.mode === 'dark' ? '#0a192f' : '#0a192f', height: 'auto', color: 'white' }} >
                <div className='container-fluid d-flex justify-content-evenly flex-wrap p-10'
                >
                    <div className='logo flex-fill pl-8cd pb-3'>
                        <img className="rounded" src={logo} alt='logo' width="200" height="200" />
                    </div>

                    <div className='right flex-fill pb-2'>
                        <h3 className='pb-3 pt-3 fs-5'><b>In case of any queries, Contact us:</b></h3>
                        <a href="tel:+919310457041 " className="list-group-item list-group-item-action active" aria-current="true">
                        <i className="fa-solid fa-phone-volume"></i>
                        <p className='inline p-3'>+91 9310457041</p>
                        </a>
                        <a href="tel:+917017621967" className="list-group-item list-group-item-action">
                        <i className="fa-solid fa-phone-volume"></i>
                        <p className='inline p-3'>+91 7017621967</p>
                        </a>
                        <a href="mailto:mafecdelhi@gmail.com" className="list-group-item list-group-item-action">
                        <i className="fa-solid fa-envelope"></i><p className='inline p-3'>mafecdelhi@gmail.com</p>
                        </a>
                    </div>

                    <div className='left flex-fill'>
                        <h3 className='pb-3 pt-3 fs-5'><b>Follow Us</b></h3>
                        <ul>
                            <li >
                            <a href="https://instagram.com/mafecdelhi?igshid=OGQ5ZDc2ODk2ZA==" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-square-instagram"></i>
                                <p className='inline p-3'>Instagram</p>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/@mafecdelhi6784" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-youtube"></i>
                                    <p className='inline p-3'>YouTube</p>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className='text-center p-3'>
                    <p><b>NOTE : MAFEC DELHI holds discretionary powers regarding the conduction of entrance examination and it’s related information.</b></p>                   
                </div>
                <p className=' border-top text-center p-2'><b>Copyright &copy; 2023 MAFEC. All Rights Reserved</b></p>

            </footer>
        )
    }
}
