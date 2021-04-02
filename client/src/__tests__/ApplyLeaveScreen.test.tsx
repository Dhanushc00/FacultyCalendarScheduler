import ApplyLeaveScreen from '../screens/Faculty/ApplyLeaveScreen';
import { render } from '../test-utils';

describe("Render apply leave page", () => {
    it('Options in leave type should render without errors', async () => {
        const { getByText } = render(<ApplyLeaveScreen/>);
        const placeholder = getByText('leave type');
        expect(placeholder).toBeTruthy();
    });

    it('renders a apply button', () => {
      const {getByText} = render(<ApplyLeaveScreen/>);
      expect(getByText("Apply")).toBeInTheDocument();
    });
  });