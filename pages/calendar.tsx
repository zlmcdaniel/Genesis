import dayjs from 'dayjs';
import type { NextPage } from 'next'
import { FC, useState } from 'react';
import Calendar, { CalendarDayHeader } from '../components/Calendar'
import { Dialog } from '@headlessui/react'
import { Field, Form, Formik } from 'formik';
import classNames from 'classnames';

interface AddAccountDialogProps {
  isOpen: boolean;
  closeSelf: () => void;
}

const AddEventDialog: FC<AddAccountDialogProps> = ({ isOpen, closeSelf }) => {
  const inputFieldClasses = 'p-2 rounded-lg bg-stone-600 text-text-light'

  return (
    <Dialog open={isOpen} onClose={() => closeSelf()} className='bg-stone-800 w-1/3 mx-auto rounded-lg p-8 text-text-light border-4 border-rose-800'>
      <Dialog.Overlay />
      <Dialog.Title className='text-4xl'>Add new account</Dialog.Title>

      <Formik
        initialValues={{
          name: '',
          username: '',
          password: '',
          data: {
            url: ''
          }
        }}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          resetForm();
          setSubmitting(false);
          closeSelf();
        }}
      >
        {({ isSubmitting }) =>
          <Form className='space-y-4 mt-4'>
            <div className='grid grid-cols-3 gap-2'>
              <Field className={classNames(inputFieldClasses, 'col-span-2')} as='input' name='name' placeholder='Account Name' />
              <Field className={classNames(inputFieldClasses)} as='input' name='username' placeholder='Username' />
              <Field className={classNames(inputFieldClasses)} as='input' name='password' placeholder='Password' />
              <Field className={classNames(inputFieldClasses, 'col-span-2')} as='input' name='data.url' placeholder='URL' />
            </div>

            <button type='submit' disabled={isSubmitting} className='bg-rose-800 text-text-light p-2 rounded-lg'>Add Account</button>
          </Form>
        }
      </Formik>

    </Dialog>
  );
}

const Home: NextPage = () => {
  const [yearAndMonth, setYearAndMonth] = useState([dayjs().year(), dayjs().month() + 1]);
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  return (
    <>
      <AddEventDialog isOpen={addAccountOpen} closeSelf={() => setAddAccountOpen(false)} />
      <Calendar
        yearAndMonth={yearAndMonth}
        onYearAndMonthChange={setYearAndMonth}
        renderDay={(calendarDayObject) => (
          <div>
            <CalendarDayHeader calendarDayObject={calendarDayObject} />
          </div>
        )}
      />
    </>
  )
}

export default Home
