import { UserSeed } from "../seeders/user.seed";
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";

export class SeedUser1650196673237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all(UserSeed.map(async (userseed) => {
            await getRepository('users').save(userseed)
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
