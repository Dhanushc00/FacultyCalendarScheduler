import ModifyDayTypeScreen from '../screens/Admin/ModifyDayTypeScreen';
import { render  } from '../test-utils';

describe("render modify day page", () => {
    it('Title', () => {
      const {getByText} = render(<ModifyDayTypeScreen/>);
      expect(getByText(/DAY TYPE DETAILS/i)).toBeInTheDocument();
    });
    it('renders column names',()=>{
        const {getAllByText} = render(<ModifyDayTypeScreen/>);
        expect(getAllByText(/Date/i)).toBeTruthy();
        expect(getAllByText(/Type/i)).toBeTruthy();
        expect(getAllByText(/Delete/i)).toBeTruthy();

    });

    it('renders add semester button', () => {
      const {getByText} = render(<ModifyDayTypeScreen/>);
      expect(getByText("Add Day Type")).toBeInTheDocument();
    });
  });