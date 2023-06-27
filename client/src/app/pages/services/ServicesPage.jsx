/* eslint-disable jsx-a11y/anchor-is-valid */
import {useIntl} from 'react-intl'
import {Modal} from 'react-bootstrap'
import {KTIcon} from '../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {notifications} from '@mantine/notifications'
import { LoadingOverlay } from '@mantine/core';

const CreateService = ({show, handleclose, servers, getServices}) => {
  const [name, setName] = useState('')
  const [path, setPath] = useState('')
  const [server, setServer] = useState(0)

  const submit = () => {
    axios
      .post('http://localhost:3000/services', {
        name,
        path,
        server,
      })
      .then((res) => {
        handleclose()
        getServices()
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
          <h5 className='modal-title' id='staticBackdrop'>
            Créer une clé SSH
          </h5>
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
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group row mt-5'>
            <label className='col-xl-3 col-lg-3 col-form-label'>Chemin</label>
            <div className='col-lg-9 col-xl-9'>
              <input
                className='form-control form-control-lg form-control-solid'
                type='text'
                value={path}
                onChange={(e) => setPath(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group row mt-5'>
            <label className='col-xl-3 col-lg-3 col-form-label'>Server</label>
            <div className='col-lg-9 col-xl-9'>
              <select
                className='form-control form-control-lg form-control-solid'
                value={server}
                onChange={(e) => setServer(e.target.value)}
              >
                <option value={0}>Aucune</option>
                {servers.map((server) => (
                  <option value={server.id}>{server.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <button
            type='button'
            className='btn btn-light-primary font-weight-bold'
            onClick={handleclose}
          >
            Annuler
          </button>
          <button type='button' className='btn btn-primary font-weight-bold' onClick={submit}>
            Créer
          </button>
        </div>
      </div>
    </Modal>
  )
}

const ServiceLine = ({service, servers, getServices}) => {
  const [isReloading, setIsReloading] = useState(false)

  const remove = (id) => {
    axios.delete('http://localhost:3000/services', {data: {id}}).then((res) => {
      getServices()
    })
  }

  const restart = (id) => {
    setIsReloading(true)
    axios.get(`http://localhost:3000/restartService/${id}`).then((res) => {
      notifications.show({
        title: 'Service redémarré',
        message: res.data.split('\n').map((line) => <p>{line}</p>),
      })
      setIsReloading(false)
    })
  }

  return (
    <tr className='position-relative'>
      <td className='pl-0'>
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-50 symbol-light mr-4'>
            <span className='symbol-label'>
              <img
                src='/media/svg/misc/terminal-svgrepo-com.svg'
                className='h-50 align-self-center'
                alt=''
              />
            </span>
          </div>
          <div>
            <p className='text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg'>
              {service.name}
            </p>

            <span className='text-muted font-weight-bold d-block'>créé par: Admin</span>
          </div>
        </div>
      </td>
      <td>
        <div className='d-flex align-items-center'>
          <div>
            <p className='text-dark-75 font-weight-bolder text-hover-primary'>{service.path}</p>
          </div>
        </div>
      </td>
      <td>
        <div className='d-flex align-items-center'>
          <div>
            <p className='text-dark-75 font-weight-bolder text-hover-primary'>
              {servers.find((server) => server.id === service.serverId)?.name || 'Aucun'}
            </p>
          </div>
        </div>
      </td>
      <td>
        <div className='d-flex'>
          <a
            href='#'
            onClick={() => remove(service.id)}
            className='btn btn-icon btn-light btn-hover-danger btn-sm'
          >
            <span className='svg-icon svg-icon-md svg-icon-primary'>
              <i className='bi bi-trash'></i>
            </span>
          </a>
          <a
            href='#'
            onClick={() => restart(service.id)}
            className='btn btn-icon btn-light btn-hover-danger btn-sm ms-5'
          >
            <span className='svg-icon svg-icon-md svg-icon-primary'>
              <i className='bi bi-arrow-clockwise'></i>
            </span>
          </a>
        </div>
      </td>

      <LoadingOverlay visible={isReloading} overlayBlur={2} />
    </tr>
  )
}

const ServicesPage = () => {
  const [show, setShow] = useState(false)
  const [services, setServices] = useState([])
  const [servers, setServers] = useState([])

  useEffect(() => {
    getServices()
    getServers()
  }, [])

  const getServers = () => {
    axios.get('http://localhost:3000/servers').then((res) => {
      setServers(res.data)
    })
  }

  const getServices = () => {
    axios.get('http://localhost:3000/services').then((res) => {
      setServices(res.data)
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
                <a
                  href='#'
                  onClick={() => setShow(true)}
                  className='btn btn-light-primary font-weight-bolder mr-2'
                >
                  <i className='bi bi-plus'></i>Ajouter
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
                      <th style={{minWidth: '150px'}}>path</th>
                      <th style={{minWidth: '250px'}}>Serveur lié</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => <ServiceLine service={service} servers={servers} getServices={getServices} />)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateService
        show={show}
        handleclose={() => setShow(false)}
        servers={servers}
        getServices={getServices}
      />
    </>
  )
}

const ServicesWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <ServicesPage />
    </>
  )
}

export {ServicesWrapper}
