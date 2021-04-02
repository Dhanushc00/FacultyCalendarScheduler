import EventNav from '../navigation/EventNav';
import { render  } from '../test-utils';

describe('Event page navigation titles',()=>{
    it('titles',()=>{
        const { getByText } = render(<EventNav/>);
        expect(getByText("CREATE EVENT")).toBeInTheDocument();
        expect(getByText("VIEW ALL EVENTS")).toBeInTheDocument();
        expect(getByText("PARTICIPANT")).toBeInTheDocument();
    })
})