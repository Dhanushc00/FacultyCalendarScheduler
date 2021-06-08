import ViewPeriods from '../screens/Faculty/ViewPeriods';
import { render  } from '../test-utils';

describe("Class periods page render", () => {
    it('Title', () => {
      const {getByText} = render(<ViewPeriods/>);
      expect(getByText(/CLASS PERIODS/i)).toBeInTheDocument();
    });
    it('renders Select sem option', async () => {
        const { getAllByText } = render(<ViewPeriods/>);
        const placeholder = getAllByText("Select Sem Id");
        expect(placeholder).toBeTruthy();
    });

    it('renders column names',()=>{
        const {getAllByText} = render(<ViewPeriods/>);
        expect(getAllByText(/Day/i)).toBeTruthy();
        expect(getAllByText(/Start Time/i)).toBeTruthy();
        expect(getAllByText(/End Time/i)).toBeTruthy();
        expect(getAllByText(/Course Code/i)).toBeTruthy();
    });
});