import CustomButton from '@/components/atoms/Button';
import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { getAddformSchema } from './schema';
import { useForm } from 'react-hook-form';

const AddCustomLineItem = (props: IAddCustomLineItemProps) => {

    const { closeDrawer } = props;
    const { translate } = useTranslate();
    const formFields = getAddformSchema(translate)

	const { register, handleSubmit, reset, formState: { errors, isValid }, control } = useForm({
		defaultValues: {}
	});

    const onCancel = () => {
        reset({})
        closeDrawer()
    }

    const onSave = (data: any) => {
        console.log("line items data", data)
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSave)}>
            {/* Header Section */}
            <Box className="flex flex-col border-b pb-4 mt-5">
                <Box className="flex flex-row justify-between items-center">
                    <Typography className='text-[1.5rem] leading-[2.125rem] font-semibold'>
                        {translate("orders.addCustomLineItem")}
                    </Typography>
                    <Box className="flex" gap={1}>
                        <CustomButton onClick={onCancel} type='button' title={translate("common.cancel")} />
                        <CustomButton type='submit' className='text-white' title={translate("common.save")} variant='contained' />
                    </Box>
                </Box>
            </Box>

            <Box className="h-[65vh] overflow-y-auto">
            <Box className="flex justify-center mt-4">
					<Box className="w-[46.375rem]">
							<Box className="flex flex-col gap-2">
								<CustomFieldMapper
									formFields={formFields}
									formData={{}}
									register={register}
									errors={errors}
									control={control}
								/>
							</Box>
					</Box>
				</Box>
            </Box>
        </Box>
    )
}

export default AddCustomLineItem;