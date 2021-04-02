import ViewEventsScreen from '../screens/Faculty/ViewEventsScreen';
import { render , fireEvent,screen } from '../test-utils';

describe("Render event list page", () => {
    it('renders title', () => {
      const {getByText} = render(<ViewEventsScreen/>);
      expect(getByText(/Events created by you/i)).toBeInTheDocument();
    });
    it('renders table caption', () => {
      const {getByText} = render(<ViewEventsScreen/>);
      expect(getByText(/Events as a creator/i)).toBeInTheDocument();
    });
    
    it('renders column names',()=>{
        const {getByText} = render(<ViewEventsScreen/>);
        expect(getByText(/Event Name/i)).toBeInTheDocument();
        expect(getByText(/Start Time/i)).toBeInTheDocument();
        expect(getByText(/End Time/i)).toBeInTheDocument();
        // expect(getByText(/View / Edit/i)).toBeInTheDocument();
        expect(getByText(/Delete/i)).toBeInTheDocument();
    });
});
