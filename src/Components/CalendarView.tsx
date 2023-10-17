import {Slot} from "./OccupiersDetail";
import Kalend, {CalendarEvent, CalendarView as Views} from "kalend";
import './calendar.css';

export const CalendarView: React.FC<{slots: Slot[]}> = ({slots}) => {


    const events: CalendarEvent[] = slots.map(s => {return {
        startAt: s.start,
        endAt: s.end,
        summary: s.name,
        color: s.color,
        id: s.id
    }})

    return (
      <div>
          <h3>Calendrier</h3>
          <div style={{width: "100vw"}}>
              <div style={{maxWidth: "50vw", margin: "auto", height: 800, fontFamily: "inherit"}} className="calendar">
                  <Kalend
                      initialDate={new Date().toISOString()}
                      initialView={Views.MONTH}
                      disabledViews={[Views.AGENDA, Views.WEEK, Views.DAY, Views.THREE_DAYS]}
                      timeFormat={'24'}
                      weekDayStart={'Monday'}
                      language="fr"
                      events={events}
                  />
              </div>
          </div>


      </div>
  )
}