import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginPage from 'app/login/page'; 
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CookieService } from '@/lib/cookieService';
import { loginUser } from 'app/api/login.api';


// Mocking external modules
jest.mock('../api/login.api');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));
jest.mock('../../lib/cookieService', () => ({
  CookieService: {
    setCookie: jest.fn()
  }
}));

describe('LoginPage Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks(); 
  });

  test('should render login form and handle login success', async () => {
    
    (loginUser as jest.Mock).mockResolvedValue({ accessToken: 'mock_token' });

    render(<LoginPage />);

  
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123'
      });
    });

   
    await waitFor(() => {
      expect(CookieService.setCookie).toHaveBeenCalledWith(
        '__q_state_KCvexG5JgVh2E54r',
        'mock_token',
        7
      );
      expect(toast.success).toHaveBeenCalledWith('Login successful!');
    });

    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  test('should handle login failure', async () => {
    
    (loginUser as jest.Mock).mockRejectedValue(new Error('Login failed'));

    render(<LoginPage />);

    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' }
    });

   
    fireEvent.click(screen.getByRole('button', { name: /login/i }));


    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'wrongpassword'
      });
    });

   
    // await waitFor(() => {
    //   expect(mockPush).not.toHaveBeenCalled();
    //   expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    // });
  });
});

