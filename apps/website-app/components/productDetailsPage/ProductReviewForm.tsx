'use client';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const ProductReviewForm = () => {
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!rating || !review || !name || !email) {
      setError('All fields are required.');
      return;
    }

    // Reset error
    setError('');

    const reviewData = {
      rating,
      review,
      name,
      email,
    };

   
    console.log('Submitted Review:', reviewData);

    // Display data in an alert box
    alert(`
      Review Submitted Successfully!
      Rating: ${rating} out of 5
      Review: ${review}
      Name: ${name}
      Email: ${email}
    `);

    setRating(0);
    setReview('');
    setName('');
    setEmail('');
  };

  return (
    <>
      <div className="pt-[40px] flex justify-center w-[100%] ">
        <div className="flex flex-col lg:flex-row w-[75%] ">
          <div className="lg:w-1/2 pr-4">
            <h3 className="text-[24px] font-medium mb-[22px]">
              Rating & Review
            </h3>
            <h3 className="text-[24px] font-medium mb-[22px]">
              There are no reviews yet.
            </h3>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-[24px] font-medium mb-[8px]">
              Review this product
            </h3>
            <p className="text-[16px] text-[var(--tp-text-body)] leading-[1.4] mb-[8px]">
              Your email address will not be published. Required fields are
              marked *
            </p>
            <form onSubmit={handleSubmit}>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="mb-6">
                <Label className="text-[14px] text-[var(--tp-text-body)] leading-[1.4] mr-[8px]">
                  Your Rating:
                </Label>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      cursor: 'pointer',
                      color: rating >= star ? 'orange' : '#ccc',
                    }}
                    className="w-18 h-18 text-[18px]"
                  >
                    ★
                  </span>
                ))}
                <span className="text-[14px] text-[var(--tp-text-body)] leading-[1.4] ml-[8px]">
                  {' '}
                  {rating} out of 5
                </span>
              </div>
              <div className="mb-5">
                <Label className="text-[14px] text-[var(--tp-text-body)] leading-[1.4]">
                  Your Review
                </Label>
                <textarea
                  id="review"
                  value={review}
                  className="w-full border text-[14px] text-[var(--tp-text-body)] leading-[1.4] p-2 mt-[5px] h-40"
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here..."
                  required
                />
              </div>
              <div className="mb-5">
                <Label className="text-[14px] text-[var(--tp-text-body)] leading-[1.4] ">
                  Your Name
                </Label>

                <input
                  type="text"
                  id="name"
                  value={name}
                  className="w-full border text-[14px] text-[var(--tp-text-body)] leading-[1.4] p-2 mt-[5px]"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-6">
                <Label className="text-[14px] text-[var(--tp-text-body)] leading-[1.4] ">
                  Your Email
                </Label>

                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border text-[14px] text-[var(--tp-text-body)] leading-[1.4] p-2 mt-[5px]"
                  placeholder="test@mail.com"
                  required
                />
              </div>
              <Button
                type="submit"
                className=" px-6 py-2 bg-[var(--tp-customBlue-primary)] text-white border-[var(--tp-common-black)]  text-base font-medium px-8 py-2 h-[46] rounded-none"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReviewForm;
