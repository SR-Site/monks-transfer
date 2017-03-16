interface OptionsData
{
	/**
	 * @description Phone contact object
	 */
	phone: {
		/**
		 * @description Phone number
		 */
		phoneNumber: string;
	};
	/**
	 * @description Email contact object
	 */
	email: {
		/**
		 * @description Email address
		 */
		emailAddress: string;
		/**
		 * @description Email body text
		 */
		emailBody: string;
		/**
		 * @description Email subject
		 */
		emailSubject: string;
	};
}

export default OptionsData;