import FullCalendarView from "../component/FullCalendarView";
import Navbar from "../component/Navbar";

export default function Calender() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <FullCalendarView />
      </main>
    </>
  );
}
