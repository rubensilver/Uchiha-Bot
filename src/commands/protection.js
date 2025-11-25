// protection.js

/**
 * Protection module for Bot-Uchiha
 * Includes security features:
 * - Anti-ban
 * - Backup system
 * - Anti-spam protection
 */

class Protection {
    constructor() {
        this.banList = [];
        this.maxRequests = 5;
        this.userRequests = {};
    }

    /**
     * Anti-Ban Feature
     */
    antiBan(userId) {
        if (this.banList.includes(userId)) {
            console.log(`User ${userId} is banned.`);
            return false;
        }
        return true;
    }

    /**
     * Backup System Feature
     */
    backup(userData) {
        const timestamp = new Date().toISOString();
        // This would contain logic to back up userData
        console.log(`Backing up user data at ${timestamp}:`, userData);
    }

    /**
     * Anti-Spam Protection
     */
    checkSpam(userId) {
        if (!this.userRequests[userId]) {
            this.userRequests[userId] = 0;
        }

        this.userRequests[userId]++;

        if (this.userRequests[userId] > this.maxRequests) {
            this.banList.push(userId);
            console.log(`User ${userId} has been banned for spamming.`);
            return false;
        }
        return true;
    }
}

module.exports = Protection;
