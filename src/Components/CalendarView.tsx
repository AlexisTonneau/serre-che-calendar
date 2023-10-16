import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import {Slot} from "./OccupiersDetail";


export const CalendarView: React.FC<{slots: Slot[]}> = ({slots}) => {

    return (
      <div>
          <h3>Calendrier</h3>
          <div style={{width: "100vw"}}>
              <div style={{maxWidth: "50vw", margin: "auto"}}>
                  <Calendar isReadOnly view="month" />
              </div>
          </div>


      </div>
  )
}