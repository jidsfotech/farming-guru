import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { farmingCategories } from 'src/lib/constants';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FarmService {
  constructor(private configService: ConfigService) { }

  categories() {
    return {
      message: 'Categories fetched successfully.',
      data: farmingCategories,
    };
  }

  async details(params: { farmingType: string }): Promise<any> {
    // const apiKey = this.configService.get<string>('deepseek.apiKey');
    // const apiUrl = this.configService.get<string>('deepseek.url');
    const apiKey = this.configService.get<string>('DEEPSEEK_API_KEY');
    const apiUrl = this.configService.get<string>('DEEPSEEK_API_URL');


    const { farmingType } = params;
    const prompt = `Provide a detailed overview of ${farmingType}, including required resources, setup costs, best practices, and challenges.`;
    try {
      const response = await axios.post(
        apiUrl as string,
        {
          model: 'deepseek/deepseek-chat:free',
          messages: [
            { role: 'user', content: prompt },
            {
              role: 'system',
              content: `
              You will be given a prompt to get details of a given farming type.
              The details expected includes required resources, setup costs, best practices, and challenges

              EXAMPLE INPUT:
              Provide a detailed overview of Livestock Farming, including required resources, setup costs, best practices, and challenges

              EXAMPLE OUTPUT:
              {resources:answer, setupCost:answer, bestPractice:answer}
              `,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return {
        message: `${farmingType} farming details  retrieved successfully.`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        data: response.data.choices[0].message.content,
      };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error('Error calling DeepSeek API:', error);
      throw new HttpException(
        'Error calling DeepSeek API',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
