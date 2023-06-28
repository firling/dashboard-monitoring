/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
      />
      <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' />
      <SidebarMenuItem to='/sshkeys' icon='key' title='Clés SSH' />
      <SidebarMenuItem to='/servers' title='Servers' fontIcon='bi-hdd-rack' />
      <SidebarMenuItem to='/services' title='Services' fontIcon='bi-window' />
      
    </>
  )
}

export {SidebarMenuMain}
