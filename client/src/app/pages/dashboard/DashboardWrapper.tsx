/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
} from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
      <div className='col-4'>
        <iframe 
          src="https://grafana.lepetitbac.online/d-solo/rYdddlPWk/node-exporter-full?orgId=1&theme=light&panelId=77"
          width="100%" 
          height="200" 
          frameBorder="0"
        ></iframe>
      </div>
      <div className='col-4'>
        <iframe 
          src="https://grafana.lepetitbac.online/d-solo/rYdddlPWk/node-exporter-full?orgId=1&theme=light&panelId=78"
          width="100%" 
          height="200" 
          frameBorder="0"
        ></iframe>
      </div>

      <div className='col-4'>
        <iframe 
          src="https://grafana.lepetitbac.online/d-solo/rYdddlPWk/node-exporter-full?orgId=1&theme=light&panelId=74" 
          width="100%"
          height="200" 
          frameBorder="0"
        ></iframe>
      </div>
    </div>
    {/* end::Row */}

  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
