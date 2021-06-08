import CalendarScreen from '../screens/Faculty/CalendarScreen';
import { render  } from '../test-utils';

describe("Render Calendar page", () => {
    it('renders Day type badges', () => {
        const {getByText} = render(<CalendarScreen/>);
        expect(getByText("Holiday")).toBeInTheDocument();
        expect(getByText("Working Day")).toBeInTheDocument();
        expect(getByText("Working for staffs only")).toBeInTheDocument();
    });

    it('renders Event type badges', () => {
        const {getByText} = render(<CalendarScreen/>);
        expect(getByText("Meeting")).toBeInTheDocument();
        expect(getByText("Misc")).toBeInTheDocument();
        expect(getByText("Exam")).toBeInTheDocument();
    });
});