/* eslint-disable jsx-a11y/anchor-is-valid */
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import { Modal } from 'react-bootstrap'
import { KTIcon } from '../../../_metronic/helpers'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CreateKey = ({show, handleclose, getKeys}) => {
    const [name, setName] = useState('');
    const [key, setKey] = useState('');

    const submit = () => {
        axios.post('http://localhost:3000/sshkeys', { name, key })
            .then(res => {
                handleclose();
                getKeys();
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
                        <label className='col-xl-3 col-lg-3 col-form-label'>Clé</label>
                        <div className='col-lg-9 col-xl-9'>
                            <textarea 
                                className='form-control form-control-lg form-control-sol' 
                                value={key} 
                                onChange={e => setKey(e.target.value)}
                            ></textarea>
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

const SshkeysPage = () => {
    const [show, setShow] = useState(false);
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        getKeys();
    }, [])

    const getKeys = () => {
        axios.get('http://localhost:3000/sshkeys')
            .then(res => {
                setKeys(res.data);
            })
    }

    const remove = (id) => {
        axios.delete('http://localhost:3000/sshkeys', {data: {id}})
            .then(res => {
                getKeys();
            })
    }

    return (
        <>
            <div className='row'>
                <div className='col-xl-12'>
                    <div className='card card-custom gutter-b'>
                        <div className='card-header'>
                            <div className='card-title'>
                                <h3 className='card-label'>SSH Keys</h3>
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
                                            <th style={{minWidth: '250px'}}>Clé</th>
                                            <th style={{minWidth: '150px'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {keys.map(key => (
                                            <tr>
                                                <td className='pl-0'>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='symbol symbol-50 symbol-light mr-4'>
                                                            <span className='symbol-label'>
                                                                <img src='/media/svg/misc/006-plurk.svg' className='h-50 align-self-center' alt='' />
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className='text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg'>{key.name}</p>
                                                            
                                                            <span className='text-muted font-weight-bold d-block'>créée par: Admin</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='d-flex align-items-center'>
                                                        <div>
                                                            <p className='text-dark-75 font-weight-bolder text-hover-primary'>
                                                                {key.key}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='d-flex'>
                                                        <a href='#' onClick={() => remove(key.id)} className='btn btn-icon btn-light btn-hover-danger btn-sm'>
                                                            <span className='svg-icon svg-icon-md svg-icon-primary'>
                                                                <i className="bi bi-trash"></i>
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
            <CreateKey show={show} handleclose={() => setShow(false)} getKeys={getKeys} />
        </>
    )
}

const SshkeysWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <SshkeysPage />
    </>
  )
}

export {SshkeysWrapper}
