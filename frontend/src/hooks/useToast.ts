import { useToast } from '@chakra-ui/react'
type ToastStatus = 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined

function useToastMessage() {
	const toast = useToast()

	const showToast = (title: string, description: string, status?: ToastStatus) => {
		toast({
			title: title || null,
			description: description || null,
			status: status,
			duration: 9000,
			isClosable: true,
		})
		return
	}

	const errorToast = (message: string) => {
		toast({
			title: 'Error',
			description: message,
			status: 'error',
			duration: 9000,
			isClosable: true,
		})
	}
	return { showToast, errorToast }
}

export default useToastMessage
