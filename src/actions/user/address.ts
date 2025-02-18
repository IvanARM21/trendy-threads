"use server";

import { prisma } from "@/lib/prisma";
import { UserAddressInput } from "@/interfaces/user.interface";

export const createUserAddress = async (addressData : UserAddressInput) => {
    try {
        if(!addressData.userId) {
            throw new Error('User ID is required');
        }
        const addressSaved = await prisma.userAddress.create({ data: addressData });
        return addressSaved;
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error ocurred");
    }
}

export const getUserAddresses = async (userId : string) => {
    try {
        if(!userId) {
            throw new Error('User ID is required');
        }

        const addresses = await prisma.userAddress.findMany({ where: { userId }});
        return addresses
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error ocurred");
    }
}

export const getUserAddress = async (addressId : string) => {
    try {
        if(!addressId) {
            throw new Error('Address ID is required');
        }

        return await prisma.userAddress.findUnique({ where: { id: addressId } });
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error ocurred");
    }
}

export const updateUserAddress = async (addressId : string, addressData : UserAddressInput) => {
    try {
        if(!addressId) {
            throw new Error('Address ID is required');
        }

        await prisma.userAddress.update({ where: { id: addressId }, data: addressData });
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error ocurred");
    }
}

export const deleteUserAddress = async (addressId : string) => {
    try {
        if(!addressId) {
            throw new Error('Address ID is required');
        }

        await prisma.userAddress.delete({ where: { id: addressId } });
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error ocurred");
    }
}