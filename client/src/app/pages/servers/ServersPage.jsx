/* eslint-disable jsx-a11y/anchor-is-valid */
import {useIntl} from 'react-intl'
import { Modal } from 'react-bootstrap'
import { KTIcon } from '../../../_metronic/helpers'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CreateServer = ({show, handleclose, keys, getServers}) => {
    const [name, setName] = useState('');
    const [ip, setIp] = useState('');
    const [login, setLogin] = useState('');
    const [key, setKey] = useState(0);

    const submit = () => {
        axios.post(`${process.env.REACT_APP_BACKURL}/servers`, { 
            name, 
            ip,
            login,
            sshkey: key
         })
            .then(res => {
                handleclose();
                getServers();
            })
    }

    return (
        <Modal
            id='kt_modal_create_app'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-900px'
            show={show}
            backdrop={true}
        >
            <div className='modal-content'>
                <div className='modal-header'>
                    <h5 className='modal-title' id='staticBackdrop'>Créer une clé SSH</h5>
                    <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleclose}>
                        <KTIcon className='fs-1' iconName='cross' />
                    </div>
                </div>
                <div className='modal-body'>
                    <div className='form-group row'>
                        <label className='col-xl-3 col-lg-3 col-form-label'>Nom</label>
                        <div className='col-lg-9 col-xl-9'>
                            <input 
                                className='form-control form-control-lg form-control-solid' 
                                type='text' 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className='form-group row mt-5'>
                        <label className='col-xl-3 col-lg-3 col-form-label'>Ip</label>
                        <div className='col-lg-9 col-xl-9'>
                            <input 
                                className='form-control form-control-lg form-control-solid' 
                                type='text' 
                                value={ip} 
                                onChange={e => setIp(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className='form-group row mt-5'>
                        <label className='col-xl-3 col-lg-3 col-form-label'>Login</label>
                        <div className='col-lg-9 col-xl-9'>
                            <input 
                                className='form-control form-control-lg form-control-solid' 
                                type='text' 
                                value={login} 
                                onChange={e => setLogin(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className='form-group row mt-5'>
                        <label className='col-xl-3 col-lg-3 col-form-label'>Clé SSH</label>
                        <div className='col-lg-9 col-xl-9'>
                            <select
                                className='form-control form-control-lg form-control-solid'
                                value={key}
                                onChange={e => setKey(e.target.value)}
                            >
                                <option value={0}>Aucune</option>
                                {keys.map(key => (
                                    <option value={key.id}>{key.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btn btn-light-primary font-weight-bold' onClick={handleclose}>Annuler</button>
                    <button type='button' className='btn btn-primary font-weight-bold' onClick={submit}>Créer</button>
                </div>
            </div>
        </Modal>
    )
}

const Services = ({show, handleclose, server}) => {
    const [logs, setLogs] = useState("")

    useEffect(() => {
      if (!server) return
      axios.get(`${process.env.REACT_APP_BACKURL}/allServices/${server.id}`).then((res) => {
        setLogs(res.data.replaceAll('ago', ''))
      })
    }, [server, show])

  
    return (
      <Modal
        id='kt_modal_create_app'
        tabIndex={-1}
        aria-hidden='true'
        dialogClassName='modal-dialog modal-dialog-centered mw-900px'
        show={show}
        backdrop={true}
        scrollable={true}
      >
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='staticBackdrop'>
              Liste des services du serveur {server?.name}
            </h5>
            <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleclose}>
              <KTIcon className='fs-1' iconName='cross' />
            </div>
          </div>
          <div className='modal-body'>
                <div className='table-responsive'>
                    <table className='table table-head-custom table-head-bg table-borderless table-vertical-center'>
                        <thead>
                            <tr className='text-uppercase'>
                                <th>CONTAINER ID</th>
                                <th>IMAGE</th>
                                <th>COMMAND</th>
                                <th>CREATED</th>
                                <th>STATUS</th>
                                <th>PORTS</th>
                                <th>NAMES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.split('\n').slice(1).map(log => (
                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <p className='text-dark-75 font-weight-bolder text-hover-primary'>
                                                    {log.trim().split(/\s+/)[0]}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <p className='text-dark-75 font-weight-bolder text-hover-primary'>
                                                    {log.trim().split(/\s+/)[1]}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <p className='text-dark-75 font-weight-bolder text-hover-primary'>
                                                    {log.trim().split(/\s+/)[2]} {log.trim().split(/\s+/)[3].includes('\"') ? log.trim().split(/\s+/)[3] : ""}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <p className='text-dark-75 font-weight-bolder text-hover-primary'>
                                                    {log.trim().split(/\s+/)[3].includes('\"') ? 
                                                    log.trim().split(/\s+/)[4] + " " + log.trim().split(/\s+/)[5] : 
                                                    log.trim().split(/\s+/)[3] + " " + log.trim().split(/\s+/)[4]}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <p className='text-dark-75 font-weight-bolder text-hover-primary'>
                                                    {log.trim().split(/\s+/)[3].includes('\"') ? 
                                                        `${log.trim().split(/\s+/)[6]} ${log.trim().split(/\s+/)[7]} ${log.trim().split(/\s+/)[8]}`
                                                        : `${log.trim().split(/\s+/)[5]} ${log.trim().split(/\s+/)[6]} ${log.trim().split(/\s+/)[7]}`}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <p className='text-dark-75 font-weight-bolder text-hover-primary'>
                                                    {log.trim().split(/\s+/)[8]?.includes('/tcp') && log.trim().split(/\s+/)[8]}
                                                    {log.trim().split(/\s+/)[9]?.includes('/tcp') && log.trim().split(/\s+/)[9]}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <p className='text-dark-75 font-weight-bolder text-hover-primary'>
                                                    {log.trim().split(/\s+/).slice(-1)}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-light-primary font-weight-bold'
              onClick={handleclose}
            >
              Fermer
            </button>
          </div>
        </div>
      </Modal>
    )
}

const ServersPage = () => {
    const [show, setShow] = useState(false);
    const [servers, setServers] = useState([]);
    const [keys, setKeys] = useState([]);

    const [showServices, setShowServices] = useState(false);
    const [server, setServer] = useState(null);

    useEffect(() => {
        getServers();
        getKeys();
    }, [])

    const getKeys = () => {
        axios.get(`${process.env.REACT_APP_BACKURL}/sshkeys`)
            .then(res => {
                setKeys(res.data);
            })
    }

    const getServers = () => {
        axios.get(`${process.env.REACT_APP_BACKURL}/servers`)
            .then(res => {
                setServers(res.data);
            })
    }

    const remove = (id) => {
        axios.delete(`${process.env.REACT_APP_BACKURL}/servers`, {data: {id}})
            .then(res => {
                getServers();
            })
    }

    return (
        <>
            <div className='row'>
                <div className='col-xl-12'>
                    <div className='card card-custom gutter-b'>
                        <div className='card-header'>
                            <div className='card-title'>
                                <h3 className='card-label'>Serveurs</h3>
                            </div>
                            <div className='card-toolbar'>
                                <a href='#' onClick={() => setShow(true)} className='btn btn-light-primary font-weight-bolder mr-2'>
                                    <i className="bi bi-plus"></i>Ajouter
                                </a>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='table-responsive'>
                                <table className='table table-head-custom table-head-bg table-borderless table-vertical-center'>
                                    <thead>
                                        <tr className='text-uppercase'>
                                            <th style={{minWidth: '250px'}} className='pl-7'>
                                                <span className='text-dark-75'>Nom</span>
                                            </th>
                                            <th style={{minWidth: '150px'}}>IP</th>
                                            <th style={{minWidth: '150px'}}>Login</th>
                                            <th style={{minWidth: '250px'}}>Clé SSH liée</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {servers.map(server => (
                                            <tr>
                                                <td className='pl-0'>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='symbol symbol-50 symbol-light mr-4'>
                                                            <span className='symbol-label'>
                                                                <img src='/media/svg/misc/server-svgrepo-com.svg' className='h-50 align-self-center' alt='' />
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className='text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg'>{server.name}</p>
                                                            
                                                            <span className='text-muted font-weight-bold d-block'>créé par: Admin</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='d-flex align-items-center'>
                                                        <div>
                                                            <p className='text-dark-75 font-weight-bolder text-hover-primary'>
                                                                {server.ip}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='d-flex align-items-center'>
                                                        <div>
                                                            <p className='text-dark-75 font-weight-bolder text-hover-primary'>
                                                                {server.login}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='d-flex align-items-center'>
                                                        <div>
                                                            <p className='text-dark-75 font-weight-bolder text-hover-primary'>
                                                                {keys.find(key => key.id === server.sshkeyId)?.name || 'Aucune'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='d-flex'>
                                                        <a href='#' onClick={() => remove(server.id)} className='btn btn-icon btn-light btn-hover-danger btn-sm'>
                                                            <span className='svg-icon svg-icon-md svg-icon-primary'>
                                                                <i className="bi bi-trash"></i>
                                                            </span>
                                                        </a>
                                                        <a href='#' onClick={() => {
                                                            setServer(server)
                                                            setShowServices(true)
                                                        }} className='btn btn-icon btn-light btn-hover-danger btn-sm ms-5'>
                                                            <span className='svg-icon svg-icon-md svg-icon-primary'>
                                                                <i className="bi bi-list-ul"></i>
                                                            </span>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateServer show={show} handleclose={() => setShow(false)} keys={keys} getServers={getServers} />
            <Services show={showServices} handleclose={() => setShowServices(false)} server={server} />
        </>
    )
}

const ServersWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <ServersPage />
    </>
  )
}

export {ServersWrapper}
