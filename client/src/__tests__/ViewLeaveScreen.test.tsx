import ViewLeaveScreen from '../screens/Faculty/ViewLeaveScreen';
import { render  } from '../test-utils';

describe("View leave page render",()=>{
    it('renders title', () => {
        const {getAllByText} = render(<ViewLeaveScreen/>);
        expect(getAllByText(/Leave Details/i)).toBeTruthy();
      });
    it('renders column names',()=>{
        const {getByText} = render(<ViewLeaveScreen/>);
        expect(getByText(/Leave Type/i)).toBeInTheDocument();
        expect(getByText(/From Date/i)).toBeInTheDocument();
        expect(getByText(/To Date/i)).toBeInTheDocument();
        expect(getByText(/Edit/i)).toBeInTheDocument();
        expect(getByText(/Delete/i)).toBeInTheDocument();
    });
    it('Renders the table caption',()=>{
        const {getByText} = render(<ViewLeaveScreen/>);
        expect(getByText(/Maintain Your Leave Details Here!!/i)).toBeInTheDocument();
    });
    it('render leave type', () => {
        const {getByText} = render(<ViewLeaveScreen/>);
        expect(getByText("On-Duty")).toBeInTheDocument();
        expect(getByText("Medical")).toBeInTheDocument();
        expect(getByText("Normal")).toBeInTheDocument();
      });
});