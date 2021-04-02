import CreatePeriods from '../screens/Admin/CreatePeriods';
import { render  } from '../test-utils';

describe("Periods page", () => {
    it('Title', () => {
      const {getByText} = render(<CreatePeriods/>);
      expect(getByText(/CLASS PERIODS/i)).toBeInTheDocument();
    });
  
    it('renders username and sem option', async () => {
      const { getAllByText } = render(<CreatePeriods/>);
      const placeholder = getAllByText('Select Faculty Username');
      expect(placeholder).toBeTruthy();
      const placeholder1=getAllByText('Select Sem Id');
      expect(placeholder1).toBeTruthy();

    });
  
    it('renders add period button', () => {
      const {getByText} = render(<CreatePeriods/>);
      expect(getByText("Add Period")).toBeInTheDocument();
    });

    it('renders column names',()=>{
        const {getAllByText} = render(<CreatePeriods/>);
        expect(getAllByText(/Day/i)).toBeTruthy();
        expect(getAllByText(/Course Code/i)).toBeTruthy();
        expect(getAllByText(/Start Time/i)).toBeTruthy();
        expect(getAllByText(/End Time/i)).toBeTruthy();
        expect(getAllByText(/Delete/i)).toBeTruthy();

    });

    it('select day', async () => {
        const { getAllByText } = render(<CreatePeriods/>);
        const placeholder2 = getAllByText('Select WeekDay');
        expect(placeholder2).toBeTruthy();  
      });
    it('render input field course code', () => {
      const {getByTestId} = render(<CreatePeriods/>);
      expect(getByTestId(/coursecode/i)).toBeInTheDocument();
    });
  });