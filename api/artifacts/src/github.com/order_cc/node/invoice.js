"use strict";

const { Contract } = require("fabric-contract-api");

class Invoice extends Contract {
    async createInvoice(ctx, invoice_id, billFrom, billTo, qty, prod_id, completionDate, totalAmount, paidAmount, owner) {
        let invoice = {
            invoice_id,
            billFrom,
            billTo,
            qty,
            prod_id,
            issueDate: Date(Date.now()),
            completionDate,
            status: "New",
            totalAmount,
            paidAmount,
            dueAmount: (totalAmount-paidAmount).toString,
            owner,
            docType: "invoice"
        };
        console.log(invoice);

        try {
            await ctx.stub.putState(invoice.invoice_id, Buffer.from(JSON.stringify(invoice)));
            console.log("The invoice is created");
            return(JSON.stringify({response:"The invoice is created successfully!!!"}));
        } catch (error) {
            throw new Error(
                "Invoice is not created this the error faced in creating: " +
                    error
            );
        }
    }

    async viewInvoice(ctx, invoice_id) {
        try {
            const invoicesBytes = await ctx.stub.getState(invoice_id); // get the car from chaincode state
            if (!invoicesBytes || invoicesBytes.length === 0) {
                throw new Error(`${invoice_id} does not exist`);
            }
            console.log(invoicesBytes.toString());
            return invoicesBytes.toString();
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }

    async updateInvoice(ctx, invoice_id, status) {
        try {
            const invoicesBytes = await ctx.stub.getState(invoice_id); // get the car from chaincode state
            if (!invoicesBytes || invoicesBytes.length === 0) {
                throw new Error(`${invoice_id} does not exist`);
            }
            console.log(invoicesBytes.toString());
            let invoice = JSON.parse(invoicesBytes.toString());
            invoice.status = status;
            try {
                await ctx.stub.putState(
                    invoice.invoice_id,
                    Buffer.from(JSON.stringify(invoice))
                );
                console.log("The invoice is updated");
                return(JSON.stringify({response:"The invoice is updated successfully!!!"}));
            } catch (error) {
                throw new Error(
                    "Invoice is not updated this the error faced in creating: " +
                        error
                );
            }
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }
}

module.exports = Invoice;
