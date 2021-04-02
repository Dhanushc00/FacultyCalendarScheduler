import CalendarNav from '../navigation/CalendarNav';
import { render  } from '../test-utils';

describe('Calendar navigation titles',()=>{
    it('titles',()=>{
        const { getByText } = render(<CalendarNav/>);
        expect(getByText("CALENDAR")).toBeInTheDocument();
    })
})