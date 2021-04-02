import ApplyLeaveNav from '../navigation/ApplyLeaveNav';
import { render  } from '../test-utils';

describe('Event page navigation titles',()=>{
    it('titles',()=>{
        const { getByText } = render(<ApplyLeaveNav/>);
        expect(getByText("APPLY LEAVE")).toBeInTheDocument();
        expect(getByText("VIEW LEAVES")).toBeInTheDocument();
    })
})