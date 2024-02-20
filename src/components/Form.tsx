import { useEffect, useState } from "react";

// interface Input { value: string, error?: string };

const Form = () => {
    const currentDate = new Date();
    const inputGlobalClasses = 'py-2 px-2 md:py-3 md:px-4 block w-full rounded-lg text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 text-2xl md:text-[32px] font-bold max-w-24 md:max-w-40 w-full';

    function isValidDate(day: number, month: number, year: number): boolean {
        // Month is zero-based in JavaScript, so we subtract 1 from the month value
        const date = new Date(year, month - 1, day);

        // Check if the resulting date is valid
        // Also, make sure the month and year values are the same as the input
        if (
            date.getDate() === day &&
            date.getMonth() === month - 1 &&
            date.getFullYear() === year
        ) {
            return true;
        }
        return false;
    }
    function isDateIsInPast(day: number, month: number, year: number): boolean {
        // Month is zero-based in JavaScript, so we subtract 1 from the month value
        const date = new Date(year, month - 1, day);
        // console.log('date: ' + date)

        // Get today's date
        const today = new Date();
        // console.log('today: ' + today)

        // Subtract one day from today
        const pastDate = new Date(today);
        // console.log('pastDate: ' + pastDate)
        pastDate.setDate(today.getDate() - 1);
        // console.log('pastDate2: ' + pastDate)

        // Check if the resulting date is valid
        // Also, make sure the month and year values are the same as the input
        // Date is not in the future
        if (date <= today) {
            return true;
        };
        return false;
    }

    function formatNumber(num: any) {
        var value = parseInt(num);
        return value < 10 ? `0${value}` : `${value}`;
    }

    const [formDay, setDay] = useState<string>('');
    const [dayError, setDayError] = useState<string>('');
    useEffect(() => {
        if (formDay) {
            if (parseInt(formDay) > 31) {
                setDayError('Must be a valid day');
            } else {
                setDayError('');
            }
        }
    }, [formDay]);

    const [formMonth, setMonth] = useState<string>('');
    const [monthError, setMonthError] = useState<string>('');
    useEffect(() => {
        if (formMonth) {
            if (parseInt(formMonth) > 12) {
                setMonthError('Must be a valid month');
            } else {
                setMonthError('');
            }
        }
    }, [formMonth]);

    const [formYear, setYear] = useState<number>();
    const [yearError, setYearError] = useState<string>('');
    useEffect(() => {
        const currentDate = new Date();
        if (formYear) {
            if (formYear > currentDate.getFullYear()) {
                setYearError('Must be in the past');
            } else {
                setYearError('');
            }
        }
    }, [formYear]);

    const [age, setAge] = useState<any>({ years: '--', months: '--', days: '--' });

    const [formError, setFormError] = useState<string>('');

    function handleValidateFullDate() {

        const date = parseInt(formDay);
        const month = parseInt(formMonth);
        const year = parseInt(formYear + '');

        const valid = isValidDate(date, month, year);
        const past = isDateIsInPast(date, month, year);

        // console.log('valid:-', valid, ', past:-', past)

        if (valid) {
            if (past) {
                setFormError('');
            } else {
                setFormError('Date must be in the past');
            }
        } else {
            setFormError('Must be a valid date');
        }

        if (date < 32 && month < 13 && year <= currentDate.getFullYear() && valid && past) {
            return true;
        }
        return false;
    }

    interface Age {
        years: number;
        months: number;
        days: number;
    }

    function calculateAge(birthDate: Date): Age {
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        // If the birth month is after the current month or
        // if the birth month is the same as the current month but the birth day is after the current day,
        // subtract one year
        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            // Adjust months and days accordingly
            months += 12;
            if (days < 0) {
                const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
                days += lastMonth.getDate();
            }
        }

        return { years, months, days };
    }

    function handleFormSubmit(e: any) {
        e.preventDefault();
        const validation = handleValidateFullDate();
        if (validation) {
            const date = parseInt(formDay);
            const month = parseInt(formMonth);
            const year = parseInt(formYear + '');
            const birthDate = new Date(year, month, date);
            const ageNow = calculateAge(birthDate);
            console.log('ageNow:- ' + ageNow.years)
            setAge({ years: ageNow.years, months: ageNow.months, days: ageNow.days })
        }
    }

    return (
        <div className="w-full h-full py-28">
            <div className="max-w-[800px] mx-auto w-full min-h-[500px] rounded-3xl rounded-br-[150px] bg-white py-12 px-8 md:px-12">
                <form className="block" onSubmit={handleFormSubmit}>
                    <div className="min-h-[126px]">
                        <div className="flex gap-4 md:gap-8">
                            <div className="max-w-24 md:max-w-40 w-full">
                                <Label id="input-day" label="DAY" error={dayError || formError} />
                                <input
                                    id="input-day"
                                    className={`${dayError || formError ? 'border-error focus:border-error focus:ring-error' : 'border-gray-200 focus:border-active focus:ring-active'} ${inputGlobalClasses}`}
                                    name="day"
                                    type="text"
                                    value={formDay}
                                    onChange={(e) => setDay(formatNumber(e.target.value))}
                                    placeholder="DD"
                                />
                                {!formError && dayError ? <ErrorMessage text={dayError} /> : ''}
                            </div>
                            <div className="max-w-24 md:max-w-40 w-full">
                                <Label id="input-month" label="MONTH" error={monthError || formError} />
                                <input id="input-month"
                                    className={`${monthError || formError ? 'border-error focus:border-error focus:ring-error' : 'border-gray-200 focus:border-active focus:ring-active'} ${inputGlobalClasses}`}
                                    name="month"
                                    type="text"
                                    value={formMonth}
                                    onChange={(e) => setMonth(formatNumber(e.target.value))}
                                    placeholder="MM"
                                />
                                {!formError && monthError ? <ErrorMessage text={monthError} /> : ''}
                            </div>
                            <div className="max-w-24 md:max-w-40 w-full">
                                <Label id="input-year" label="YEAR" error={yearError || formError} />
                                <input id="input-year"
                                    className={`${yearError || formError ? 'border-error focus:border-error focus:ring-error' : 'border-gray-200 focus:border-active focus:ring-active'} ${inputGlobalClasses}`}
                                    name="year"
                                    type="number"
                                    value={formYear}
                                    onChange={(e: any) => setYear(e.target.value)}
                                    placeholder="YYYY"
                                    minLength={4}
                                    maxLength={4}
                                    min={1970}
                                    max={currentDate.getFullYear()}
                                />
                                {!formError && yearError ? <ErrorMessage text={yearError} /> : ''}
                            </div>
                        </div>
                        {formError ? <ErrorMessage text={formError} /> : ''}
                    </div>
                    <div className="w-full flex justify-center md:justify-end items-center relative">
                        <button className="bg-active rounded-full p-3 md:p-6 z-10 hover:bg-black" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44">
                                <g fill="none" stroke="#FFF" strokeWidth="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"></path></g>
                            </svg>
                        </button>
                        <div className="w-full bg-gray-200 h-[2px] absolute top-1/2 z-4"></div>
                    </div>

                    <div className="block text-[50px] md:text-[105px] leading-none italic font-extrabold mt-10 md:mt-6">
                        <div className="flex">
                            <DataSpan>{age.years || '--'}</DataSpan>&nbsp;years
                        </div>
                        <div className="flex">
                            <DataSpan>{age.months || '--'}</DataSpan>&nbsp;months
                        </div>
                        <div className="flex">
                            <DataSpan>{age.days || '--'}</DataSpan>&nbsp;days
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

const Label = ({ id, label, error }: any) => {
    return (
        <label htmlFor={id} className={`${error ? 'text-error' : 'text-gray-500'} block font-semibold text-sm mb-2 dark:text-white`}>{label}</label>
    )
}
const DataSpan = ({ children }: any) => {
    return <span className="text-active">{children}</span>
}

const ErrorMessage = ({ text }: any) => {
    return (
        <p className="text-xs font-normal italic text-error mt-2">{text}</p>
    )
}

export default Form;