import ModifySemScreen from '../screens/Admin/ModifySemScreen';
import { render  } from '../test-utils';

describe("Semester page", () => {
    it('Title', () => {
      const {getByText} = render(<ModifySemScreen/>);
      expect(getByText(/SEMESTER DETAILS/i)).toBeInTheDocument();
    });
    it('renders column names',()=>{
        const {getAllByText} = render(<ModifySemScreen/>);
        expect(getAllByText(/SemId/i)).toBeTruthy();
        expect(getAllByText(/Start Date/i)).toBeTruthy();
        expect(getAllByText(/End Date/i)).toBeTruthy();
        expect(getAllByText(/Sem No/i)).toBeTruthy();
    });

    it('render input fields', () => {
      const {getByTestId} = render(<ModifySemScreen/>);
      expect(getByTestId(/SemId/i)).toBeInTheDocument();
    });
  
    it('renders semester no. option', async () => {
      const { getAllByText } = render(<ModifySemScreen/>);
      const placeholder = getAllByText('Sem No');
      expect(placeholder).toBeTruthy();
    });
  
    it('renders add semester button', () => {
      const {getByText} = render(<ModifySemScreen/>);
      expect(getByText("Add Semester")).toBeInTheDocument();
    });
  });