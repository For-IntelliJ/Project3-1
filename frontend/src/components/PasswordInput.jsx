import React, { useState } from 'react';

const PasswordInput = ({ onValid }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkMatch(value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    checkMatch(password, value);
  };

  const checkMatch = (pw1, pw2) => {
    if (pw1.length < 8 || pw1.length > 12) {
      setError('비밀번호는 8~12자여야 합니다.');
      onValid(false);
    } else if (pw1 !== pw2) {
      setError('비밀번호가 일치하지 않습니다.');
      onValid(false);
    } else {
      setError('');
      onValid(true);
    }
  };

  return (
    <div>
      <p className="mb-1 text-font">비밀번호</p>
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={handlePasswordChange}
        minLength={8}
        maxLength={12}
        required
        className="w-full rounded border border-hover p-2 transition duration-200 hover:border-2 hover:border-hover focus:border-2 focus:border-hover focus:outline-none"
      />
      <p className="mb-1 text-font">비밀번호 확인</p>
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        minLength={8}
        maxLength={12}
        required
        className="w-full rounded border border-hover p-2 transition duration-200 hover:border-2 hover:border-hover focus:border-2 focus:border-hover focus:outline-none"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordInput;
